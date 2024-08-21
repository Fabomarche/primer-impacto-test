import { Injectable } from '@nestjs/common'
import AppRepository from './app.repository'
import { CreateVideoGameDto } from './dto/create-video-game.dto'
import { VideoGame } from './schemas/game.schema'

@Injectable()
export class AppService {
    constructor(private readonly appRepository: AppRepository) {}

    getHello(): string {
        return 'Hello World!'
    }

    async getAllVideoGames(): Promise<VideoGame[]> {
        return this.appRepository.getAllVideoGames()
    }

    async deleteVideoGame(id: string): Promise<VideoGame> {
        const videoGame = await this.appRepository.getVideoGameById(id)
        if (!videoGame) {
            throw new Error('Video game not found')
        }
        await this.appRepository.deleteVideoGame(id)
        return videoGame
    }

    async addVideoGame(createVideoGameDto: CreateVideoGameDto): Promise<VideoGame> {
        return this.appRepository.addVideoGame(createVideoGameDto)
    }

    async updateVideoGame(id: string, updatedVideoGame: CreateVideoGameDto): Promise<VideoGame> {
        const videoGame = await this.appRepository.getVideoGameById(id)
        if (!videoGame) {
            throw new Error('Video game not found')
        }
        return this.appRepository.updateVideoGame(id, updatedVideoGame)
    }
}
