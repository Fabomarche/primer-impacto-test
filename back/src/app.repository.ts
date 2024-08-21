import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { VideoGame } from './schemas/game.schema'
import { CreateVideoGameDto } from './dto/create-video-game.dto'

@Injectable()
class AppRepository {
    constructor(@InjectModel(VideoGame.name) private videoGameModel: Model<VideoGame>) {}

    public async getAllVideoGames(): Promise<VideoGame[]> {
        return this.videoGameModel.find().exec()
    }

    public async getVideoGameById(id: string): Promise<VideoGame | null> {
        return this.videoGameModel.findById(id).exec()
    }

    public async addVideoGame(createVideoGameDto: CreateVideoGameDto): Promise<VideoGame> {
        const createdVideoGame = new this.videoGameModel(createVideoGameDto)
        return createdVideoGame.save()
    }

    public async updateVideoGame(
        id: string,
        updateVideoGameDto: CreateVideoGameDto,
    ): Promise<VideoGame | null> {
        return this.videoGameModel.findByIdAndUpdate(id, updateVideoGameDto, { new: true }).exec()
    }

    public async deleteVideoGame(id: string): Promise<VideoGame | null> {
        return this.videoGameModel.findByIdAndDelete(id).exec()
    }
}

export default AppRepository
