if (process.env.NODE_ENV !== 'production') await new Promise<void>((resolve) => { import('dotenv').then((dotenv) => { dotenv.config(); resolve() }) })

import { Exception, ResCodes } from '@varbz/peeka'
import { Injector } from '@varbz/di'
import { ManagerService } from './services/service.js'
import { SignUpSaga } from './services/sagas/sign_up.js'
import { signUp, update, verified, service } from '@varbz/equantifier_api_user_manager'
import { asynk, logger, lifecycle, postgres, redis, mongo } from './api/index.js'
import { Endpoint } from '@varbz/pointr'

process.env['name'] = service
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0"

async function main() { 
    const caller = "Global.main"
    try {
        const injector = new Injector()
        const signUpSaga = injector.getInstance(SignUpSaga)
        const manager = injector.getInstance(ManagerService)
        // console.log('endpoint',signUp.endpoint)
        asynk.post(signUp.endpoint,signUpSaga.handler)
        asynk.consume(signUp.endpoint,signUpSaga.handler)
        asynk.consume('test',manager.test)

        await redis.connect() 
        await postgres.connect()
        await mongo.connect()
        await asynk.connect()
        lifecycle.terminatables.push(asynk,mongo,redis,postgres) 

        // await asynk.amqpOutReq(new Endpoint('amqp','test',undefined,undefined,process.env['SERVICE_NAME']!),undefined,undefined,undefined)
    }
    catch (err) {
        logger.error(new Exception(caller, ResCodes.APPLICATION, null, err))
    }
}
main()
