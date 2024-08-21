import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
    })

    it('/video-games (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/video-games')
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.data).toBeDefined()
    })
})
