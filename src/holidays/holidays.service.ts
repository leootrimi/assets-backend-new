import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Holiday, HolidayCapacity } from './schema/holidays.schema';
import { Model } from 'mongoose';
import { HolidayDto } from './dto/holidays.dto';

@Injectable()
export class HolidaysService {
    constructor(
        @InjectModel(Holiday.name)
        private holidayModel: Model<Holiday>,
        @InjectModel(HolidayCapacity.name)
        private holidayCapacityModel: Model<HolidayCapacity>
    ) {}

    async create(request: any, holiday: HolidayDto) {
        console.log('user', request.user);
        
        return await this.holidayModel.create({
            'employer_id': request.user.sub,
            'fromDate': holiday.fromDate,
            'toDate': holiday.toDate,
            'status': 'pending',
            'type': holiday.type
        })
    }

    async getHolidayForUser(request: any) {
        return this.holidayModel.find({
            employer_id: request.user.sub,
            fromDate: { $gt: new Date()}
        })
    }

    async createHolidayCapacityForUser(body: any) {
        return this.holidayCapacityModel.create(body)
    }

    async getHolidayCapacityForUser(request: any) {
        const employer_id = request.user.sub
        if (!request.user.sub) {
            return "Invalid id"
        }
        return this.holidayCapacityModel.findOne({
            'employer_id': employer_id
        })
    }
}
