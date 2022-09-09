import pg from 'pg'
import mongoose from 'mongoose'
import { BaseAsynk, BaseMongo, BasePostgres, BaseRedis } from '@varbz/connector'
import { LifeCycleManager, Logger } from '@varbz/peeka'
import { EmailVerification, emailVerificationSchema, MobileVerification, mobileVerificationSchema } from '@varbz/equantifier_api_user_verification'

export const logger = new Logger()
export const lifecycle = new LifeCycleManager(logger)
export class AsynkImpl extends BaseAsynk {
    private static _shared:AsynkImpl
    private constructor(){ super(logger,lifecycle) }
    static get shared(){ if(this._shared == undefined) this._shared = new this(); return this._shared }
}
export class Redis extends BaseRedis { 
    private static _shared:Redis
    private constructor(){ super(logger,lifecycle) }
    static get shared(){ if(this._shared == undefined) this._shared = new this(); return this._shared }
}
export class Postgres extends BasePostgres {
    private static _shared:Postgres
    private constructor(){ super(asynk,logger,lifecycle) }
    static get shared(){ if(this._shared == undefined) this._shared = new this(); return this._shared }
    connectModels = async (pool:pg.Pool)=>{}
}
export class Mongo extends BaseMongo { 
    private static _shared:Mongo
    private constructor(){ super(logger,lifecycle) }
    static get shared(){ if(this._shared == undefined) this._shared = new this(); return this._shared }

    EmailVerificationModel:mongoose.Model<EmailVerification> = {} as any
    MobileVerificationModel:mongoose.Model<MobileVerification> = {} as any

    connect = async ():Promise<void>=>{
        await this.createConnection(process.env.MONGO,process.env.SERVICE_NAME,async (connection:mongoose.Connection)=>{
            this.EmailVerificationModel = this.modelize(connection,'email_verification',emailVerificationSchema,{ timestamps: true })
            this.MobileVerificationModel = this.modelize(connection,'mobile_verification',mobileVerificationSchema,{ timestamps: true })
        })
    }

} 
export const redis = Redis.shared
export const mongo = Mongo.shared
export const asynk = AsynkImpl.shared
export const postgres = Postgres.shared
