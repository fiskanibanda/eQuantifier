import { Injectable } from '@varbz/di'
import { BaseRouter } from '@varbz/builder'
import { ViewModel } from './viewmodel.js'
import { VerificationRouter } from '../verification/router.js'

@Injectable
export class RegistrationRouter extends BaseRouter {

    viewModel = ViewModel
    aliases = ['registration','sign_in','sign_up','/']
    currentDir = new URL('.', import.meta.url).pathname
    
    constructor(){
        super(VerificationRouter)
    }

}

export const router = new RegistrationRouter()