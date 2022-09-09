import pg from 'pg'
import mongoose from 'mongoose'
import { BaseAsynk, BaseMongo, BasePostgres, BaseRedis, SQLTable } from '@varbz/connector'
import { LifeCycleManager, Logger } from '@varbz/peeka'
import { userSchema } from '@varbz/equantifier_api_user_manager'

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

    UserModel:SQLTable<typeof userSchema> = {} as any
    connectModels = async (pool:pg.Pool)=>{
        this.UserModel = new SQLTable('user',userSchema,['userId'])
        await this.UserModel.createTable(pool)
    }
}
export class Mongo extends BaseMongo { 
    private static _shared:Mongo
    private constructor(){ super(logger,lifecycle) }
    static get shared(){ if(this._shared == undefined) this._shared = new this(); return this._shared }

    connect = async ():Promise<void>=>{
        await this.createConnection(process.env.MONGO,process.env.SERVICE_NAME,async (connection:mongoose.Connection)=>{})
    }

}
export const redis = Redis.shared
export const mongo = Mongo.shared
export const asynk = AsynkImpl.shared
export const postgres = Postgres.shared
