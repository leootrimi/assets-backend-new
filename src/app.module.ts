import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EquipmentsModule } from './equipments/equipments.module';

@Module({
  imports: [UsersModule, EquipmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
