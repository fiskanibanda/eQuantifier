import { Container, Image, ImageExtensions, ImageFit, Stack, Text, Alignment, View, Distribution, Direction, Borders, Color, Sides, Orientation } from '@varbz/ui'
export enum Scenes {
    HOME = "home",
    CHATS = "chats",
    PLANNER = "planner",
    NOTIFICATIONS = "notifications",
    PROFILE = "profile"
}

export default function TabView(scene:Scenes) {

    const prefix = "/tabBar/web_ic_"
    const home = scene === Scenes.HOME ? Scenes.HOME+"_selected" : Scenes.HOME
    const chats = scene === Scenes.CHATS ? Scenes.CHATS+"_selected" : Scenes.CHATS
    const planner = scene === Scenes.PLANNER? Scenes.PLANNER+"_selected" : Scenes.PLANNER
    const notifications = scene === Scenes.NOTIFICATIONS ? Scenes.NOTIFICATIONS+"_selected" : Scenes.NOTIFICATIONS
    const profile = scene === Scenes.PROFILE ? Scenes.PROFILE+"_selected" : Scenes.PROFILE

    const fav = "/Users/siya/Documents/Projects/Varbz/frontend/web/assets/src/ui/assets/favicon"
    return Container(
        //Desktop Navigation
        Stack(
            Stack(
                Image(fav,"icon",ImageFit.CONTAIN,ImageExtensions.ICON)
                .border(Borders.SOLID,'50%','1px',Color.PRIMARY_PURPLE)
                .shadow('0px','0px','8px','6px',Color.DARK_GREY)
                .size('60px','60px'),
            ).alignItems(Alignment.CENTER),
            desktopTabItem(prefix+home,home,Scenes.HOME),
            desktopTabItem(prefix+chats,chats,Scenes.CHATS),
            desktopTabItem(prefix+planner,planner,Scenes.PLANNER),
            desktopTabItem(prefix+notifications,notifications,"activity"),
            desktopTabItem(prefix+profile,profile,Scenes.PROFILE)
        )
        .setStyles({
            'position': 'fixed',
            'top': '0px',
            'left': '0px',
            'z-index': '10',
            'display': 'delete'
        }) 
            .classes('desktop')
            .backgroundColor(Color.SECONDARY_PURPLE)
            .orientation(Direction.VERTICAL)
            .alignItems(Alignment.STRETCH,Alignment.STRETCH)
            .alignContent(Alignment.STRETCH,Distribution.SPACE_EVENLY)
            .border(Borders.SOLID,'10px','0.1px',Color.SECONDARY_PURPLE,[Sides.RIGHT],[[Sides.TOP,Sides.RIGHT],[Sides.BOTTOM,Sides.RIGHT]])
            .padding('5px',Orientation.INLINE)
            .padding('5px',Orientation.BLOCK)
            .size('250px','100vh'),
        //Mobile Navigation
        Stack(
            mobileTabItem(prefix+home,home,Scenes.HOME),
            mobileTabItem(prefix+chats,chats,Scenes.CHATS),
            mobileTabItem(prefix+planner,planner,Scenes.PLANNER),
            mobileTabItem(prefix+notifications,notifications,'activity'),
            mobileTabItem(prefix+profile,profile,Scenes.PROFILE)
        )
        .setStyles({
            'position': 'fixed',
            'bottom': '0px',
            'z-index': '10',
            'display': 'delete'
        })
            .backgroundColor(Color.TRANS_WHITE)
            .classes('mobile')
            .orientation(Direction.HORIZONTAL)
            .alignItems(Alignment.CENTER,Alignment.CENTER)
            .alignContent(Distribution.SPACE_EVENLY,Alignment.CENTER)
            .border(Borders.SOLID,'10px','0.5px',Color.DARK_GREY,[Sides.TOP])
            .padding('5px',Orientation.INLINE)
            .padding('5px',Orientation.BLOCK)
            .size('100vw',undefined),

    )
}

const desktopTabItem = (img:string,alt:string,scene:string):View => {
    return Stack(
        Image(img,alt)
            .margin('15px',Orientation.INLINE)
            .size('40px','40px'),
        Text(scene)
            .color(Color.PRIMARY_PURPLE)
            .fonts(undefined,undefined,300)
            .margin('10px',Orientation.INLINE)
        )
            .padding('5px',Orientation.INLINE)
            .padding('5px',Orientation.BLOCK)
            .orientation(Direction.HORIZONTAL)
            .alignItems(Alignment.START,Alignment.CENTER)
            .alignContent(Alignment.START,Alignment.CENTER)
}

const mobileTabItem = (img:string,alt:string,scene:string):View => {
    return Stack(
        Image(img,alt)
            .margin('15px',Orientation.INLINE)
            .size('40px','40px'),
        Text(scene)
            .color(Color.PRIMARY_PURPLE)
            .fonts(undefined,undefined,300)
            .margin('10px',Orientation.INLINE)
            
        )
            .padding('5px',Orientation.INLINE)
            .padding('5px',Orientation.BLOCK)
            .orientation(Direction.VERTICAL)
            .alignItems(Alignment.CENTER,Alignment.CENTER)
            .alignContent(Alignment.CENTER,Alignment.CENTER)
}