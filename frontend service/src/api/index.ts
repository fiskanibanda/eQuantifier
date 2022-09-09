if (process.env.NODE_ENV !== 'production') await new Promise<void>((resolve) => { import('dotenv').then((dotenv) => { dotenv.config(); resolve() }) })

import pg from 'pg'
import { AppBuilder } from '@varbz/builder'
import { BaseAsynk, BasePostgres, BaseRedis } from '@varbz/connector'
import { LifeCycleManager, Logger } from '@varbz/peeka'

export const logger = new Logger()
export const lifecycle = new LifeCycleManager(logger)
export class AsynkImpl extends BaseAsynk {
    private static _shared:AsynkImpl
    private constructor(){ super(logger,lifecycle,{},{}) }
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
export class Builder extends AppBuilder {
    private static _shared:Builder 
    private constructor(){
        super(process.env.ASSETS_DIR || '',process.env.DESIGNS_DIR || '') 
    }
    static get shared(){ if(this._shared == undefined) this._shared = new this(); return this._shared }
}

export const builder = Builder.shared
export const redis = Redis.shared
export const asynk = AsynkImpl.shared
export const postgres = Postgres.shared
