import { Injectable } from '@varbz/di'
import { BaseRouter } from '@varbz/builder'
import { ViewModel } from './viewmodel.js'

@Injectable
export class HomeRouter extends BaseRouter {

    viewModel = ViewModel
    aliases = ['/home']
    currentDir = new URL('.', import.meta.url).pathname
    
    constructor(){
        super()
    }

}

export const router = new HomeRouter()