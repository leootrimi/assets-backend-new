import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCheckin } from './schema/users.checkin.schema';
import { Model } from 'mongoose';
import { UserCheckinInfoDto, UsersCheckinDto } from './dto/users.checkin.dto';
import { log } from 'console';

@Injectable()
export class UsersCheckinService {
    constructor(
        @InjectModel(UserCheckin.name)
        private userCheckingModel: Model<UserCheckin>
    ) {}

    async createCheckinForUser(request: any): Promise<UserCheckin> {

        const checkinInfo = {
            user: {
                id: request.user.sub,
                fullName: request.user.name
            },
            checkinDate: this.getCurrentDateAndTime()[0],
            checkinTime: this.getCurrentDateAndTime()[1],
            checkoutTime: undefined
        }

       try {
         return (await this.userCheckingModel.create(checkinInfo)).toObject();
       } catch (error) {
            throw new Error('Failed to create user check-in');
        }
    }

    async checkoutForUser(request: any): Promise<UserCheckin | null> {
    const currentTime = this.getCurrentDateAndTime()[1];

    try {
        const updated = await this.userCheckingModel.findOneAndUpdate(
        {
            'user.id': request.user.sub,
            checkoutTime: { $in: [null, undefined] },
        },
        {
            $set: { checkoutTime: currentTime },
        },
        {
            sort: { _id: -1 }, 
            new: true,
        }
        ).exec();

        return updated?.toObject() || null;
    } catch (error) {
        throw new Error('Failed to check out user');
    }
    }


    async getAllCheckins(): Promise<UserCheckin[]> {
        return this.userCheckingModel.find();
    }

    async getUserCheckin(request: any): Promise<UserCheckin[] | null> {
        
        return this.userCheckingModel.find({
            'user.id': request.user.sub,
            'user.fullName': request.user.name,
        })
        .sort({ _id: -1 })
        .limit(5)
        .exec();
    }

    getCurrentDateAndTime(): string[] {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return [`${year}-${month}-${day}`,`${hours}:${minutes}`];
    }
}