import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { VideoGame } from './app.repository'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    // Endpoint to get video games
    @Get('video-games')
    getAllVideoGames(): VideoGame[] {
        return this.appService.getAllVideoGames()
    }

    // Endpoint to delete a video game

    // Endpoint to add a video game

    // Endpoint to update a video game
}
