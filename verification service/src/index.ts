if (process.env.NODE_ENV !== 'production') await new Promise<void>((resolve) => { import('dotenv').then((dotenv) => { dotenv.config(); resolve() }) })

import { Exception, ResCodes } from '@varbz/peeka'
import { Injector } from '@varbz/di'
import { VerificationService } from './services/service.js'
import { verify, verification, service } from '@varbz/equantifier_api_user_verification'
import { asynk, logger, lifecycle, postgres, redis, mongo } from './api/index.js'

process.env['name'] = service
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0"

async function main() { 
    const caller = "Global.main"
    try {
        const injector = new Injector()
        const service = injector.getInstance(VerificationService)
        asynk.post(verify.endpoint,service.verify)
        asynk.consume(verification.endpoint,service.verification)
        
        await redis.connect() 
        await postgres.connect()
        await mongo.connect()
        await asynk.connect()
        lifecycle.terminatables.push(asynk,mongo,redis,postgres) 
    }
    catch (err) {
        logger.error(new Exception(caller, ResCodes.APPLICATION, null, err))
    }
}
main()
