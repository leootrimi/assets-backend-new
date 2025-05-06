import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [
    UsersModule,
    EquipmentsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    CalendarModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
