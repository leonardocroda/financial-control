import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MovementsController } from './movements.controller';
import { Movements } from './movements.entity';
import { MovementsService } from './movements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movements]), UsersModule],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule {}
