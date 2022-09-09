import { views, viewModel } from './viewmodel.js'
import {
    Container, 
    Color, 
    Image,
    ImageFit,
    Orientation,
    Borders,
    Alignment,
    Text,
    Stack,
    Direction
} from '@varbz/ui'

export default Container(
    Stack( 
        Stack(
            Text("Hi, Fiskani")
                .id('id')
                .alignSelf(Alignment.CENTER)
                .color(Color.WHITE)
                .padding('20px')
                .fonts(undefined, 'clamp(1.6rem,5vw,2rem)')
        )
            .size('100%')
            .alignSelf(Alignment.STRETCH,Alignment.START),
        Stack(
            Stack(
                Image(viewModel.assets.add_car, "icon", ImageFit.CONTAIN)
                    .margin('20px', Orientation.BLOCK)
                    .border(Borders.SOLID, '5%', '2px', Color.PRIMARY_PURPLE)
                    .shadow('0px', '0px', '6px', '6px', Color.DARK_GREY)
                    .size('40vw'),
                Text('Vehicles')
                    .alignSelf(Alignment.CENTER)
                    .color(Color.WHITE)
                    .fonts(undefined, '2rem')
            ).setStyles({ 'display': 'grid' }).orientation(Direction.VERTICAL).alignContent(Alignment.CENTER).alignItems(Alignment.CENTER),
            Stack(
                Image(viewModel.assets.dashboard, "icon", ImageFit.CONTAIN)
                    .margin('20px', Orientation.BLOCK)
                    .border(Borders.SOLID, '5%', '2px', Color.PRIMARY_PURPLE)
                    .shadow('0px', '0px', '6px', '6px', Color.DARK_GREY)
                    .size('40vw'),
                Text('Dashboards')
                    .alignSelf(Alignment.CENTER)
                    .color(Color.WHITE)
                    .fonts(undefined, '2rem')
            ).setStyles({ 'display': 'grid' }).orientation(Direction.VERTICAL).alignContent(Alignment.CENTER).alignItems(Alignment.CENTER),
            Stack(
                Image(viewModel.assets.forecast, "icon", ImageFit.CONTAIN)
                    .margin('20px', Orientation.BLOCK)
                    .border(Borders.SOLID, '5%', '2px', Color.PRIMARY_PURPLE)
                    .shadow('0px', '0px', '8px', '6px', Color.DARK_GREY)
                    .size('40vw'),
                Text('Forecast')
                    .alignSelf(Alignment.CENTER)
                    .color(Color.WHITE)
                    .fonts(undefined, '2rem')
            ).setStyles({ 'display': 'grid' }).orientation(Direction.VERTICAL).alignContent(Alignment.CENTER).alignItems(Alignment.CENTER),
            Stack(
                Image(viewModel.assets.profile, "icon", ImageFit.CONTAIN)
                    .margin('20px', Orientation.BLOCK)
                    .border(Borders.SOLID, '5%', '2px', Color.PRIMARY_PURPLE)
                    .shadow('0px', '0px', '6px', '6px', Color.DARK_GREY)
                    .size('40vw'),
                Text('Profile')
                    .alignSelf(Alignment.CENTER)
                    .color(Color.WHITE)
                    .fonts(undefined, '2rem')
            ).setStyles({ 'display': 'grid' }).orientation(Direction.VERTICAL).alignContent(Alignment.CENTER).alignItems(Alignment.CENTER),
        )

            .size('100%','100%')
            .setStyles({ 'display': 'grid', 'grid-template-columns': '1fr 1fr', }),
    )
        .setStyles({ 'display': 'grid' })
        .spacing(undefined, '3vh')
        .backgroundColor(Color.PRIMARY_PURPLE)
        .orientation(Direction.VERTICAL)
        .alignItems(Alignment.CENTER, Alignment.CENTER)
        .alignContent(Alignment.CENTER,Alignment.START)
        .size(undefined, '100vh')
        .spacing(undefined, '20px')
        
)