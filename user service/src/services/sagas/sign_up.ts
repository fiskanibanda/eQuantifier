import crypto from 'node:crypto'
import { Injectable } from '@varbz/di'
import { Exception, ResCodes } from '@varbz/peeka'
import { SignUpInput, signUp  } from '@varbz/equantifier_api_user_manager'
import { verification } from '@varbz/equantifier_api_user_verification'
import { Asynk, AMQPInReq, OriginalRequest, SagaBuilder, SagaHandler } from '@varbz/asynk'
import { logger, postgres } from '../../api/index.js'
import { ManagerService } from '../service.js'

export type Data = {
    error?: any
    input: SignUpInput
    signUp: { uid: string }
    verification: undefined
}

@Injectable
export class SignUpSaga extends ManagerService {

    svc = `SignUpSaga`
    constructor() {
        super()
    }

    get handler() {
        const signUpAction = new SagaHandler<Data,Data['signUp']>(this.signUp,'signUp')
                                    .addInput(verification.output)
                                    .persist('uid')
                                    .asynk()
        const verificationAction = new SagaHandler(this.verification,'verification')

        return new SagaBuilder<Data>(logger,signUp)
                    .push(signUpAction,verificationAction)
                    .handler
    } 
    private signUp = async (data: Data, asynk: Asynk, req: AMQPInReq,replyTo: OriginalRequest) => {
        const caller = `${this.svc}.signUp`
        logger.info(caller)
        logger.info(data)
        const password = this._password(data.input.password)
        let user = await postgres.UserModel.insert({'email': data.input.email, password })
                                .onConflict(['email'],'nothing')
                                .exec(postgres.pool)
        const requestVerification = (uid:string)=> asynk.amqpOutReq(verification,verification.request({ uid, email: data.input.email }),req.id,undefined,replyTo)
        if(user) await requestVerification(user.userId)
        else {
            user = (await postgres.UserModel.query().where(['email','=',data.input.email]).exec(postgres.pool))[0]
            if(!user.emailVerified) await requestVerification(user.userId)
            else throw new Exception(caller,ResCodes.CONFLICT,`Email: ${data.input.email} is already registered, Please sign in instead.`)
        }
    }
    private verification = async (data: Data, asynk: Asynk, req: AMQPInReq) => {
        const caller = `${this.svc}.verification`
        logger.info(caller)
        await asynk.amqpOutRes(req.id,ResCodes.CREATED,signUp.response({ userId: data.signUp.uid }))
    }
    private _password = (value:string)=> crypto.createHash('sha256').update(`${value}${process.env.salt}`).digest('hex')
}

