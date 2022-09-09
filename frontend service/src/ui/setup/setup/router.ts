import { Injectable } from '@varbz/di'
import { BaseRouter } from '@varbz/builder'
import { ViewModel } from './viewmodel.js'

@Injectable
export class SetupRouter extends BaseRouter {

    viewModel = ViewModel
    aliases = ['/setup']
    currentDir = new URL('.', import.meta.url).pathname
    
    constructor(){
        super()
    }

}

export const router = new SetupRouter()