import { Cancellable } from '@varbz/combine'
import { ObservableObject, BaseElement, TextFieldElement } from '@varbz/ui'

export const views = {
    nextTxt: new BaseElement<HTMLLabelElement>('nextTxt'),
    nameTxt: new TextFieldElement('inputTxt'),
    usernameTxt: new TextFieldElement('usernameTxt'),
    passwordImg: new BaseElement<HTMLImageElement>('passwordImg'),
    passwordDescTxt: new BaseElement<HTMLLabelElement>('passwordDescTxt'),
    forgotPasswordLink: new BaseElement<HTMLAnchorElement>('forgotPasswordLink'),
    forgotPasswordTxt: new BaseElement<HTMLLabelElement>('forgotPasswordTxt'),
    registrationLink: new BaseElement<HTMLAnchorElement>('registrationLink'),
    registrationTxt: new BaseElement<HTMLLabelElement>('registrationTxt'),
} 

export class ViewModel extends ObservableObject {

    input = ''
    password = ''
    signIn = true
    showPassword = false
    cancellables: Cancellable[] = []
    assetsDir: string = 'registration'
    assets = {
        icon: 'registration',
        show: 'show_password',
        hide: 'hide_password'
    }
    signInPath = '/sign_in'
    signUpPath = '/sign_up'

    constructor(){
        super()
        this.saveAssets()
    }

    init = (renderer:(path:string,values:Record<string,any>)=>void,path:string,params?:Record<string,any>,data?:any) => {
        // const signIn = (data ? data['signIn'] : false) || (params ? params['signIn'] : false) || (path === this.signInPath) || this.signIn
        // console.log('signIn',signIn)
        // renderer(signIn ? this.signInPath : this.signUpPath, {
        //     [views.inputTxt.id]: signIn ? "Email, Phone or Username" : "Email",
        //     [views.registrationLink.id]: signIn ? "/sign_up" : "/sign_in",
        //     [views.registrationTxt.id]: signIn ? `Don't have an account? Sign Up` : `Already have an account? Sign In`,
        // })
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
        //     .sink(()=>{
        //         console.log('name',this.input) 
        //         console.log('password',this.password)
        //         // fetch('api.varbz.com/sign_in',)
        //     })
        // views.inputTxt.input.assign(this,'input').store(this.cancellables)
        // views.passwordTxt.input.assign(this,'password').store(this.cancellables)
    }

}

export const viewModel = new ViewModel()
if (typeof window !== 'undefined') viewModel.bind()