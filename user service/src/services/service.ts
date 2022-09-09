import { Injectable } from '@varbz/di'
import { Asynk, HttpInReq, AMQPInReq, OriginalRequest } from '@varbz/asynk'
import { Exception, ResCodes } from '@varbz/peeka'
import { SignUpInput, signUp  } from '@varbz/equantifier_api_user_manager'
import { logger } from '../api/index.js'

@Injectable 
export class ManagerService {

	svc = 'ManagerService'
    constructor(){}

    test = async (asynk: Asynk, req: AMQPInReq): Promise<boolean> => {
        let or: AMQPInReq | undefined 
        const caller = `${this.svc}.test`
        try {
            logger.info(caller)

            if (req.responseFor) {
                // or = asynk.req(req.responseFor?.orId) as AMQPInReq
                const data = await req.read()
                if(data){ logger.info(data as any) }
                await asynk.amqpOutRes(req.id)
            }
            else {
                console.log('requesting')
                // or = req
                const replyTo = new OriginalRequest('test', req.id, asynk.sagaId(), process.env['SERVICE_NAME'])
                await asynk.amqpOutReq(signUp,signUp.request({ 'email': 'email@some.com', 'password': 'password'}),req.id,undefined,replyTo)
                await asynk.amqpOutRes(req.id)
                // await asynk.amqpOutReq(signUp,signUp.request({ 'email': 'email@some', 'password': 'password'}),or.id,undefined,replyTo)
            }
        }
        catch (err) {
            console.log('outError',err)
            if (or?.json) or.json.error = err
            await asynk.amqpOutError(err, or ? or.id : req.id)
            // logger.error(err as any)
        }
        return true
    }

}