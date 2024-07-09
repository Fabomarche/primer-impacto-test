import { Injectable } from '@nestjs/common';
import AppRepository from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly repo: AppRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Define methods to interact with the repository
}
