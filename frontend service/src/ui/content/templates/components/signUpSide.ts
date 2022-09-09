import { Stack, Container, Image, ImageFit, Alignment, Color } from '@varbz/ui'
import { router } from '../../../setup/registration/router.js'

export enum Scenes {
    HOME = "home",
    CHATS = "chats",
    PLANNER = "planner",
    NOTIFICATIONS = "notifications",
    PROFILE = "profile"
}

export default function SignUpSide() {
    return Container( 
        Stack(
            // Stack(
            //     Image('router.assets.icon',"icon",ImageFit.CONTAIN)
            //     .size(undefined,'10vh'),
            // ).alignItems(Alignment.END,Alignment.CENTER),
        )
        .setStyles({
            'position': 'fixed',
            'top': '0px',
            'left': '0px',
            'z-index': '10',
            'display': 'delete'
        })
        .classes('desktop')
        .backgroundColor(Color.PRIMARY_PURPLE)
        .size('30vw','100vh')
    )
} 