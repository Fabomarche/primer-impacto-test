import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Body,
    HttpException,
    HttpStatus,
    Put,
} from '@nestjs/common'
import { AppService } from './app.service'
import { VideoGame } from './schemas/game.schema'
import { CreateVideoGameDto } from './dto/create-video-game.dto'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    // Endpoint to get video games
    @Get('video-games')
    async getAllVideoGames(): Promise<{ success: boolean; message: string; data: VideoGame[] }> {
        try {
            const videoGames = await this.appService.getAllVideoGames()
            return {
                success: true,
                message: 'Video games retrieved successfully',
                data: videoGames,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // Endpoint to delete a video
    @Delete('video-games/:id')
    async deleteVideoGame(@Param('id') id: string): Promise<any> {
        try {
            const deletedVideoGame = await this.appService.deleteVideoGame(id)
            return {
                success: true,
                message: 'Video game deleted successfully',
                data: deletedVideoGame,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // Endpoint to add a video game
    @Post('video-games')
    async addVideoGame(@Body() createVideoGameDto: CreateVideoGameDto): Promise<any> {
        try {
            const newVideoGame = await this.appService.addVideoGame(createVideoGameDto)
            return {
                success: true,
                message: 'Video game added successfully',
                data: newVideoGame,
            }
        } catch (error) {
            console.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // Endpoint to update a video game
    @Put('video-games/:id')
    async updateVideoGame(
        @Param('id') id: string,
        @Body() updatedVideoGame: CreateVideoGameDto,
    ): Promise<any> {
        try {
            const updatedVideoGameResult = await this.appService.updateVideoGame(
                id,
                updatedVideoGame,
            )
            return {
                success: true,
                message: 'Video game updated successfully',
                data: updatedVideoGameResult,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
