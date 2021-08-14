import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [UserModule, CategoriesModule, MovementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
