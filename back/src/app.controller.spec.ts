import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import AppRepository from './app.repository'
import { getModelToken } from '@nestjs/mongoose'
import { VideoGame } from './schemas/game.schema'
import { Model } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateVideoGameDto } from './dto/create-video-game.dto'
import { HttpException, HttpStatus } from '@nestjs/common'

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
                AppRepository,
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

        it('should handle errors gracefully', async () => {
            jest.spyOn(appService, 'getAllVideoGames').mockRejectedValueOnce(
                new Error('Error fetching video games'),
            )
            try {
                await appController.getAllVideoGames()
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException)
                expect(error.message).toBe('Error fetching video games')
                expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
            }
        })
    })

    describe('addVideoGame', () => {
        let consoleErrorSpy: jest.SpyInstance

        beforeEach(() => {
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
        })

        afterEach(() => {
            consoleErrorSpy.mockRestore()
        })

        it('should add a new video game and return it', async () => {
            const newGameDto: CreateVideoGameDto = {
                name: 'New Game',
                genre: 'RPG',
                releaseDate: new Date(),
                metacriticScore: 88,
            }

            const newGame = {
                ...newGameDto,
                _id: 'someId',
            }

            jest.spyOn(appService, 'addVideoGame').mockResolvedValue(newGame)

            const result = await appController.addVideoGame(newGameDto)
            expect(result).toEqual({
                success: true,
                message: 'Video game added successfully',
                data: newGame,
            })
        })

        it('should handle errors gracefully', async () => {
            const newGameDto: CreateVideoGameDto = {
                name: 'New Game',
                genre: 'RPG',
                releaseDate: new Date(),
                metacriticScore: 88,
            }

            jest.spyOn(appService, 'addVideoGame').mockRejectedValueOnce(
                new Error('Error adding video game'),
            )

            try {
                await appController.addVideoGame(newGameDto)
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException)
                expect(error.message).toBe('Error adding video game')
                expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
            }
        })
    })

    describe('deleteVideoGame', () => {
        it('should delete a video game and return it', async () => {
            const gameId = 'someId'
            const deletedGame = {
                _id: gameId,
                name: 'Deleted Game',
                genre: 'RPG',
                releaseDate: new Date(),
                metacriticScore: 88,
            }

            jest.spyOn(appService, 'deleteVideoGame').mockResolvedValue(deletedGame)

            const result = await appController.deleteVideoGame(gameId)
            expect(result).toEqual({
                success: true,
                message: 'Video game deleted successfully',
                data: deletedGame,
            })
        })

        it('should handle errors gracefully', async () => {
            const gameId = 'someId'

            jest.spyOn(appService, 'deleteVideoGame').mockRejectedValueOnce(
                new Error('Error deleting video game'),
            )

            try {
                await appController.deleteVideoGame(gameId)
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException)
                expect(error.message).toBe('Error deleting video game')
                expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
            }
        })
    })

    describe('updateVideoGame', () => {
        it('should update a video game and return it', async () => {
            const gameId = 'someId'
            const updatedGameDto: CreateVideoGameDto = {
                name: 'Updated Game',
                genre: 'RPG',
                releaseDate: new Date(),
                metacriticScore: 90,
            }

            const updatedGame = {
                ...updatedGameDto,
                _id: gameId,
            }

            jest.spyOn(appService, 'updateVideoGame').mockResolvedValue(updatedGame)

            const result = await appController.updateVideoGame(gameId, updatedGameDto)
            expect(result).toEqual({
                success: true,
                message: 'Video game updated successfully',
                data: updatedGame,
            })
        })

        it('should handle errors gracefully', async () => {
            const gameId = 'someId'
            const updatedGameDto: CreateVideoGameDto = {
                name: 'Updated Game',
                genre: 'RPG',
                releaseDate: new Date(),
                metacriticScore: 90,
            }

            jest.spyOn(appService, 'updateVideoGame').mockRejectedValueOnce(
                new Error('Error updating video game'),
            )

            try {
                await appController.updateVideoGame(gameId, updatedGameDto)
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException)
                expect(error.message).toBe('Error updating video game')
                expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
            }
        })
    })
})
