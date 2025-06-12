import { Module } from '@nestjs/common';
import { UsersCheckinController } from './users-checkin.controller';
import { UsersCheckinService } from './users-checkin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCheckin, UserCheckinSchema } from './schema/users.checkin.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserCheckin.name, schema: UserCheckinSchema}
  ])],
  controllers: [UsersCheckinController],
  providers: [UsersCheckinService]
})
export class UsersCheckinModule {}
