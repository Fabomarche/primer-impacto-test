import {
    Controller,
    //  Delete,
    Get,
    //Param,
    Post,
    Body,
    HttpException,
    HttpStatus,
    //  Put,
} from '@nestjs/common'
import { AppService } from './app.service'
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
    async getAllVideoGames(): Promise<any> {
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
    /*  @Delete('video-games/:id')
    deleteVideoGame(@Param('id') id: string): any {
        try {
            const idNumber = Number(id)
            if (isNaN(idNumber)) {
                throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST)
            }
            const deletedVideoGame = this.appService.deleteVideoGame(idNumber)
            return {
                success: true,
                message: 'Video game deleted successfully',
                data: deletedVideoGame,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } */

    // Endpoint to add a video game
    @Post('video-games')
    async addVideoGame(@Body() createVideoGameDto: CreateVideoGameDto): Promise<any> {
        try {
            const newVideoGame = await this.appService.addVideoGame(createVideoGameDto)
            console.log(newVideoGame)
            return {
                success: true,
                message: 'Video game added successfully',
                data: newVideoGame,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // Endpoint to update a video game
    /*  @Put('video-games/:id')
    updateVideoGame(@Body() upadatedVideoGame: VideoGame): any {
        try {
            const updatedVideoGame = this.appService.updateVideoGame(upadatedVideoGame)
            return {
                success: true,
                message: 'Video game updated successfully',
                data: updatedVideoGame,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } */
}
