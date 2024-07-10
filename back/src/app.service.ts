import { Model, Connection } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { VideoGame } from './schemas/game.schema'
import { CreateVideoGameDto } from './dto/create-video-game.dto'

@Injectable()
export class AppService {
    constructor(
        @InjectModel(VideoGame.name) private videoGameModel: Model<VideoGame>,
        @InjectConnection() private connection: Connection,
    ) {}

    getHello(): string {
        return 'Hello World!'
    }

    // Define methods to interact with the repository
    async getAllVideoGames(): Promise<VideoGame[]> {
        return this.videoGameModel.find().exec()
    }

    async deleteVideoGame(id: string): Promise<VideoGame> {
        const videoGame = await this.videoGameModel.findById(id)
        if (!videoGame) {
            throw new Error('Video game not found')
        }
        await videoGame.deleteOne()
        return videoGame
    }

    async addVideoGame(createVideoGameDto: CreateVideoGameDto): Promise<VideoGame> {
        const createdVideoGame = new this.videoGameModel(createVideoGameDto)
        return createdVideoGame.save()
    }

    async updateVideoGame(id: string, updatedVideoGame: CreateVideoGameDto): Promise<VideoGame> {
        const videoGame = await this.videoGameModel.findById(id)
        if (!videoGame) {
            throw new Error('Video game not found')
        }
        Object.assign(videoGame, updatedVideoGame)
        return videoGame.save()
    }
}
