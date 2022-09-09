import { views } from './viewmodel.js'
import {
    Container,
    Stack,
    Text,
    Alignment, 
    Color, 
    Direction, 
} from '@varbz/ui'

export default Container(
    Stack( 
        Stack(
            Text("Next")
                .id(views.nextTxt.id)
                .alignSelf(Alignment.END)
                .color(Color.WHITE)
                .padding('20px')
                .fonts(undefined, 'clamp(1.3rem,5vw,2rem)')
        )
            .size('100%')
            .alignSelf(Alignment.STRETCH,Alignment.START),
        Stack(
            Text()
                .id(views.emailTxt.id)
                .idText()
                .alignSelf(Alignment.CENTER)
                .color(Color.WHITE)
                .padding('20px')
                .fonts(undefined, 'clamp(1.3rem,4vw,1.5rem)')
        )
            .alignSelf(Alignment.STRETCH,Alignment.START),
    )
        .setStyles({ 'display': 'grid' })
        .spacing(undefined, '3vh')
        .backgroundColor(Color.PRIMARY_PURPLE)
        .orientation(Direction.VERTICAL)
        .alignItems(Alignment.CENTER, Alignment.CENTER)
        .alignContent(Alignment.CENTER)
        .size(undefined, '100vh')
        .spacing(undefined, '20px')
)