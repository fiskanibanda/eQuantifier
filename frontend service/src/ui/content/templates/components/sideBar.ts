import { Container, Stack, Alignment, View, Direction, Borders, Color, Sides, Orientation } from '@varbz/ui'

export enum Scenes {
    HOME = "home",
    CHATS = "chats",
    PLANNER = "planner",
    NOTIFICATIONS = "notifications",
    PROFILE = "profile"
}

export default function SideBar(title:View,...icons:View[]){
    return Stack(
        Container(),
        title.setStyles({ 'justify-self': 'center' }),
        Stack(
            ...icons
        )
        .orientation(Direction.HORIZONTAL)
        .alignItems(Alignment.END,Alignment.CENTER)
        .alignContent(Alignment.END)
    )
    .orientation(Direction.HORIZONTAL)
    .setStyles({
        'position': 'sticky',
        'top': '0px',
        'right': '0px',
        'z-index': '10',
        'grid-template-columns':'1fr 1fr 1fr', 
        'display': 'grid'
    }) 
    .backgroundColor(Color.TRANS_WHITE)
    // .alignItems(Alignment.CENTER,Alignment.CENTER)
    .alignContent(Alignment.STRETCH,Alignment.STRETCH)
    .border(Borders.SOLID,'0px','0px',Color.DARK_GREY,[Sides.BOTTOM])
    .shadow('1px','0px','6px','0.5px',Color.DARK_GREY)
    .padding('5px',Orientation.INLINE)
    .padding('5px',Orientation.BLOCK)
    // .size('80%',undefined)
}
