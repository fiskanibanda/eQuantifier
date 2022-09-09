import { Cancellable } from '@varbz/combine'
import { ObservableObject, BaseElement, TextFieldElement } from '@varbz/ui'

export const views = {
    titleTxt: new BaseElement<HTMLLabelElement>('titleTxt'),
    field: new TextFieldElement('element')
} 

export class ViewModel extends ObservableObject {

    cancellables: Cancellable[] = []
    assetsDir: string = 'home'
    assets = {
        add_car: 'add_car',
        dashboard: 'dashboards',
        forecast: 'forecast',
        profile: 'profile'
    }

    constructor(){
        super()
        this.saveAssets()
    }

    init = (renderer:(path:string,values:Record<string,any>)=>void,path:string,params?:Record<string,any>,data?:any) => {
        renderer(path, {})
        return Promise.resolve()
    }

    bind = () => {
        // views
        //     .registrationLink
        //     .clicks
        //     .sink((e:Event)=> {
        //         e.preventDefault()
        //         this.signIn = !this.signIn
        //         window.history.replaceState({},this.signIn ? 'Sign In' : 'Sign Up',this.signIn ? this.signInPath : this.signUpPath)
        //         this.init(BaseElement.renderer,window.location.pathname,{},{ signIn: this.signIn })

        //     }).store(this.cancellables)
        // views
        //     .passwordImg
        //     .clicks
        //     .sink(() => {
        //         this.showPassword = !this.showPassword
        //         const txtField = views.passwordTxt.element()
        //         if (txtField) txtField.type = this.showPassword ? 'text' : 'password'
        //         const img = views.passwordImg.element()
        //         if (img) img.src = this.showPassword ? this.assets.hide : this.assets.show
                
        //     }).store(this.cancellables)
        // views
        //     .nextTxt
        //     .clicks
        //     .sink(async ()=>{
        //         const res = await fetch('https://api.equantifier.com:20001/sign_up',{ 'method': 'POST', 'body': JSON.stringify({ 'email': this.input, 'password': this.password }) })
        //         const json = await res.json()
        //         if(json.userId){
        //             console.log('userId',json.userId)
        //         }
        //         document.location.href = 'https://equantifier.com:3000/verification'
        //     })
        // views.inputTxt.input.assign(this,'input').store(this.cancellables)
        // views.passwordTxt.input.assign(this,'password').store(this.cancellables)
    }

}

export const viewModel = new ViewModel()
if (typeof window !== 'undefined') viewModel.bind()