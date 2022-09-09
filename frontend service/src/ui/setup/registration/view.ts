import { viewModel, views } from './viewmodel.js'
import {
    Container,
    Form,
    Image,
    ImageFit,
    Link,
    Stack,
    Text,
    TextField,
    Alignment, 
    Borders, 
    Color, 
    Direction, 
    Orientation, 
    Sides
} from '@varbz/ui'
import SignUpSide from '../../content/templates/components/signUpSide.js'

export default Container( 
    Form(
        Stack( 
            Stack(
                Text("Next")
                    .id(views.nextTxt.id)
                    .alignSelf(Alignment.END)
                    .color(Color.WHITE)
                    .padding('20px')
                    .fonts(undefined, 'clamp(1.3rem,5vw,2rem)'),
            )
                .size('100%'),
            Image(viewModel.assets.icon, "icon", ImageFit.CONTAIN)
                .margin('20px', Orientation.BLOCK)
                .border(Borders.SOLID, '50%', '2px', Color.PRIMARY_PURPLE)
                .size('100px', '100px'),
            Container(
                TextField()
                    .id(views.inputTxt.id)
                    .idHolder()
                    .padding('10px')
                    .size('100%', '50px')
            )
                .card()
                .size('clamp(280px,80%,500px)'),
            Container(
                Stack( 
                    TextField("Password")
                        .id(views.passwordTxt.id)
                        .setProperties({ 'type': 'password' })
                        .padding('10px'),
                    Image(viewModel.assets.show, "password visibility")
                        .id(views.passwordImg.id)
                        .size('50px', '50px')
                        .padding('10px')
                        .padding('20px', Sides.RIGHT)
                        .alignSelf(Alignment.END)
                )
                    .orientation(Direction.HORIZONTAL)
                    .size('100%', '50px')
            )
                .backgroundColor(Color.WHITE)
                .card()
                .size('clamp(280px,80%,500px)'),
            Stack(
                Text("Password must be 8 - 20 characters long")
                    .id(views.passwordDescTxt.id)
                    .color(Color.LIGHT_GREY)
                    .padding('4px', Sides.LEFT)
                    .fonts(undefined, 'clamp(0.8rem,2vw,1.3rem)'),
                Text("Forgot Password")
                    .id(views.forgotPasswordTxt.id)
                    .color(Color.WHITE)

            )
                .spacing(undefined, '2vh')
                .padding('10px', Sides.LEFT)
                .size('min(500px,80%)')
                .alignItems(Alignment.START),
            Stack(
                Link('',
                    Text()
                        .id(views.registrationTxt.id)
                        .idText()
                        .color(Color.WHITE)
                ) 
                .id(views.registrationLink.id)
                .idHref(),
                Stack(
                    Text("About")
                        .color(Color.LIGHT_GREY)
                        .padding('5px', Orientation.INLINE)
                        .fonts(undefined, '1rem'),
                    Text("Terms of Service")
                        .color(Color.LIGHT_GREY)
                        .padding('5px', Orientation.INLINE)
                        .fonts(undefined, '1rem'),
                )
                    // .alignContent(Distribution.SPACE_BETWEEN)
                    .orientation(Direction.HORIZONTAL)
                // .size('100%')
            )
                .spacing(undefined, '2vh')
                .padding('10px', Sides.LEFT)
                .size('100%')
                .alignItems(Alignment.CENTER)
                .alignSelf(undefined, Alignment.END)
                .setStyles({
                    position: 'fixed',
                    bottom: '20px'
                }) 
                .cursor()
        )
            .setStyles({ 'display': 'grid' })
            .classes('signup')
            .spacing(undefined, '3vh')
            .backgroundColor(Color.PRIMARY_PURPLE)
            .orientation(Direction.VERTICAL)
            .alignItems(Alignment.CENTER, Alignment.CENTER)
            .alignContent(Alignment.CENTER, Alignment.START)
            .size(undefined, '100vh')
    )
)