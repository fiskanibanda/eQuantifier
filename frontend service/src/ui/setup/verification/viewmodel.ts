import { Cancellable } from '@varbz/combine'
import { ObservableObject, BaseElement, TextFieldElement } from '@varbz/ui'

export const views = {
    nextTxt: new BaseElement<HTMLLabelElement>('nextTxt'),
    emailTxt: new TextFieldElement('inputTxt')
} 

export class ViewModel extends ObservableObject {

    cancellables: Cancellable[] = []
    assetsDir: string = 'verification'
    assets = {}

    constructor(){
        super()
        this.saveAssets()
    }

    init = (renderer:(path:string,values:Record<string,any>)=>void,path:string,params?:Record<string,any>,data?:any) => {
        let email = 'your E-mail Address'
        if(data && data['email']) email = data['email']
        else if(params && params['email']) email = params['email']
        renderer(path, {
            [views.emailTxt.id]: `Verification link has been sent to ${email}`
        })
        return Promise.resolve()
    }

    bind = () => {
        views.nextTxt.clicks.sink((e:Event)=>{
            console.log('next')
            document.location.href = 'https://equantifier.com:3000/home'
        })
    }

}

export const viewModel = new ViewModel()
if (typeof window !== 'undefined') viewModel.bind()