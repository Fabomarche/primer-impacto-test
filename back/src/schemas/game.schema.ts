import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type VideoGameDocument = HydratedDocument<VideoGame>

@Schema()
export class VideoGame {
    @Prop({ required: true })
    name: string

    @Prop()
    genre: string

    @Prop()
    releaseDate: Date

    @Prop()
    metacriticScore: number
}

export const VideoGameSchema = SchemaFactory.createForClass(VideoGame)
