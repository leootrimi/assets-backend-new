import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Holiday, HolidayCapacity } from './schema/holidays.schema';
import { Model } from 'mongoose';
import { HolidayDto } from './dto/holidays.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { Request } from 'express';

@Injectable()
export class HolidaysService {
    constructor(
        @InjectModel(Holiday.name)
        private holidayModel: Model<Holiday>,
        @InjectModel(HolidayCapacity.name)
        private holidayCapacityModel: Model<HolidayCapacity>
    ) {}

    async create(request: any, holiday: HolidayDto) {
        
        return await this.holidayModel.create({
            'employer_id': request.user.sub,
            'employer_name': request.user.name,
            'company_id' : holiday.company_id,
            "company_name": holiday.company_name,
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

    async getUpcomingHolidaysRequest(company_id:string, request: Request) {
        
        return this.holidayModel.find({
            status: "pending",
            fromDate: { $gt: new Date()},
            company_id: company_id
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

    @OnEvent('user_created')
    async handleCreateUserEvent(user: any) {
        return this.holidayCapacityModel.create({
            'employer_id': user.user_id,
            'fullName': user.name
        })
    }
}
