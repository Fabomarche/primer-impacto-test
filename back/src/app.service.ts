import { Injectable } from '@nestjs/common'
import AppRepository, { VideoGame } from './app.repository'

@Injectable()
export class AppService {
    constructor(private readonly repo: AppRepository) {}

    getHello(): string {
        return 'Hello World!'
    }

    // Define methods to interact with the repository
    getAllVideoGames(): VideoGame[] {
        const videoGames = this.repo.getAllVideoGames()
        if (!videoGames) {
            throw new Error('No video games found')
        }
        return videoGames
    }

    deleteVideoGame(id: number): VideoGame {
        const videoGame = this.repo.getVideoGameById(id)
        if (!videoGame) {
            throw new Error('Video game not found')
        }
        this.repo.deleteVideoGame(id)
        return videoGame
    }

    addVideoGame(videoGame: VideoGame): VideoGame {
        videoGame.releaseDate = new Date(videoGame.releaseDate)
        this.repo.addVideoGame(videoGame)
        return videoGame
    }
}
