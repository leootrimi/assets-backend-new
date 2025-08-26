import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { SharedModule } from 'src/shared/shared.module';
import { AWSServices } from 'src/utility/aws/aws.services';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema}]), SharedModule],
  controllers: [UsersController],
  providers: [UsersService, AWSServices]
})
export class UsersModule {}
