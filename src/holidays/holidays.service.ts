import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Holiday } from './schema/holidays.schema';
import { Model } from 'mongoose';
import { HolidayDto } from './dto/holidays.dto';

@Injectable()
export class HolidaysService {
    constructor(
        @InjectModel(Holiday.name)
        private holidayModel: Model<Holiday>
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
}
