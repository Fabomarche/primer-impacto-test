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
    /*
    deleteVideoGame(id: number): VideoGame {
        const videoGame = this.repo.getVideoGameById(id)
        if (!videoGame) {
            throw new Error('Video game not found')
        }
        this.repo.deleteVideoGame(id)
        return videoGame
    } */

    async addVideoGame(createVideoGameDto: CreateVideoGameDto): Promise<VideoGame> {
        const createdVideoGame = new this.videoGameModel(createVideoGameDto)
        return createdVideoGame.save()
    }

    /* updateVideoGame(updatedVideoGame: VideoGame) {
        const id = updatedVideoGame.id
        const videoGame = this.repo.getVideoGameById(id)
        if (!videoGame) {
            throw new Error('Video game not found')
        }
        this.repo.updateVideoGame(updatedVideoGame)
        return updatedVideoGame
    } */
}
