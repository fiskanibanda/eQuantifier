import { Injectable } from '@varbz/di'
import { BaseRouter } from '@varbz/builder'
import { ViewModel } from './viewmodel.js'
import { HomeRouter } from '../../home/router.js'

@Injectable
export class VerificationRouter extends BaseRouter {

    viewModel = ViewModel
    aliases = ['/verification','/email_verification']
    currentDir = new URL('.', import.meta.url).pathname
    
    constructor(){
        super(HomeRouter)
    }

}

export const router = new VerificationRouter()