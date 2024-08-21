import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import AppRepository from './app.repository'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { VideoGame, VideoGameSchema } from './schemas/game.schema'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URL'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: VideoGame.name, schema: VideoGameSchema }]),
    ],
    controllers: [AppController],
    providers: [AppService, AppRepository],
})
export class AppModule {}
