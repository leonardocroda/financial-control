import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class AppService {
  getHello(): string {
    return `Server running on port ${process.env.PORT || 3000}`;
  }
}
