import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCheckin } from './schema/users.checkin.schema';
import { Model } from 'mongoose';
import { UserCheckinInfoDto, UsersCheckinDto } from './dto/users.checkin.dto';

@Injectable()
export class UsersCheckinService {
    constructor(
        @InjectModel(UserCheckin.name)
        private userCheckingModel: Model<UserCheckin>
    ) {}

    async createCheckinForUser(userCheckin: UsersCheckinDto): Promise<UserCheckin> {
        return this.userCheckingModel.create(userCheckin)
    }

    async getAllCheckins(): Promise<UserCheckin[]> {
        return this.userCheckingModel.find();
    }

    async getUserCheckin(user: UserCheckinInfoDto): Promise<UserCheckin[] | null> {
        return this.userCheckingModel.find({
            'user.id': user.id,
            'user.fullName': user.fullName,
        }).exec();
    }
}