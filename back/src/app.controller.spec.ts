import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getModelToken } from '@nestjs/mongoose'
import { VideoGame } from './schemas/game.schema'
import { Model } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateVideoGameDto } from './dto/create-video-game.dto'

describe('AppController', () => {
    let appController: AppController
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let appService: AppService
    let mockVideoGameModel: Partial<Model<VideoGame>>

    beforeEach(async () => {
        mockVideoGameModel = {
            find: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue([
                    {
                        name: 'Game 1',
                        genre: 'Action',
                        releaseDate: new Date(),
                        metacriticScore: 85,
                    },
                    {
                        name: 'Game 2',
                        genre: 'Adventure',
                        releaseDate: new Date(),
                        metacriticScore: 90,
                    },
                ]),
            }),
        }

        const mockConnection = {
            collection: jest.fn(),
        }

        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                AppService,
                {
                    provide: getModelToken(VideoGame.name),
                    useValue: mockVideoGameModel,
                },
                {
                    provide: 'DatabaseConnection',
                    useValue: mockConnection,
                },
            ],
        }).compile()

        appController = moduleRef.get<AppController>(AppController)
        appService = moduleRef.get<AppService>(AppService)
    })

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!')
        })
    })

    describe('getAllVideoGames', () => {
        it('should return an array of video games', async () => {
            const result = await appController.getAllVideoGames()
            expect(result).toEqual({
                success: true,
                message: 'Video games retrieved successfully',
                data: [
                    {
                        name: 'Game 1',
                        genre: 'Action',
                        releaseDate: expect.any(Date),
                        metacriticScore: 85,
                    },
                    {
                        name: 'Game 2',
                        genre: 'Adventure',
                        releaseDate: expect.any(Date),
                        metacriticScore: 90,
                    },
                ],
            })
        })
    })
})
