if (process.env.NODE_ENV !== 'production') await new Promise<void>((resolve) => { import('dotenv').then((dotenv) => { dotenv.config(); resolve() }) })

import { Injector } from '@varbz/di'
import { Exception, ResCodes } from '@varbz/peeka'
import { RegistrationRouter } from './ui/setup/registration/router.js'
import { asynk, logger, lifecycle, postgres, redis, builder } from './api/index.js'

process.env['SERVICE_NAME'] = 'equantifier_frontend_web'
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0"

async function main() {
    const caller = "Global.main"
    try {
        const injector = new Injector()
        asynk.use('*',builder.resolver)
        await builder.build(injector.getInstance(RegistrationRouter))
        await redis.connect()
        await postgres.connect()
        await asynk.connect()
        lifecycle.terminatables.push(asynk)
    }
    catch (err) {
        logger.error(new Exception(caller, ResCodes.APPLICATION, null, err))
    }
}
main()