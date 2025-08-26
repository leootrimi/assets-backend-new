import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Holiday, HolidayCapacity, HolidayCapacityDefault } from './schema/holidays.schema';
import { Model } from 'mongoose';
import { HolidayDto } from './dto/holidays.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { Request } from 'express';
import { getDaysBetween } from 'src/utility/Date/date.util';

@Injectable()
export class HolidaysService implements OnModuleInit {
    constructor(
        @InjectModel(Holiday.name)
        private holidayModel: Model<Holiday>,
        @InjectModel(HolidayCapacity.name)
        private holidayCapacityModel: Model<HolidayCapacity>,
        @InjectModel(HolidayCapacityDefault.name)
        private holidayCapacityDefaultModel: Model<HolidayCapacityDefault>
    ) {}

    async onModuleInit() {
       const count = await this.holidayCapacityDefaultModel.countDocuments();
       if (count == 0) {
        await this.holidayCapacityDefaultModel.create({});
       }
    }

    async create(request: any, holiday: HolidayDto) {
        
        console.log('holiday', holiday)
        return await this.holidayModel.create({
            'employer_id': request.user.sub,
            'employer_name': request.user.name,
            'fromDate': holiday.fromDate,
            'toDate': holiday.toDate,
            'status': 'pending',
            'type': holiday.type
        })
    }

    async getAllHolidayRequests() {
        return this.holidayModel.find()
    }

    async getHolidayForUser(request: any) {
        return this.holidayModel.find({
            employer_id: request.user.sub
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


async acceptHolidayRequest(request_id: string, employer_id: string) {
  try {
    const request = await this.holidayModel.findByIdAndUpdate(
      request_id,
      { status: "approved" },
      { new: true }
    );

    if (!request) {
      throw new Error("Holiday request not found");
    }

    if (!request.fromDate || !request.toDate) {
      throw new Error("Request is missing fromDate or toDate");
    }
    // 2. Calculate how many days off
    const from = new Date(request.fromDate as unknown as Date | string);
    const to = new Date(request.toDate as unknown as Date | string);

    const daysRequested = getDaysBetween(from, to)
    // +1 because 21 → 24 Aug = 4 days, not 3

    console.log("requestedDays", daysRequested);
    
    let updateField: any = {};

    switch (request.type) {
      case "sick":
        updateField = { $inc: { medicalLeaveDays: -daysRequested } };
        break;
      case "vacation":
        updateField = { $inc: { daysOff: -daysRequested } };
        break;
      case "wfh":
        updateField = { $inc: { workFromHomeDays: -daysRequested } };
        break;
      default:
        throw new Error(`Unknown holiday type: ${request.type}`);
    }

    const updatedCapacity = await this.holidayCapacityModel.findOneAndUpdate(
      { employer_id },
      updateField,
      { new: true }
    );

    return { request, updatedCapacity, daysRequested };
  } catch (err) {
    console.error("Error accepting holiday request:", err);
    throw err;
  }
}

    async rejectHolidayRequest(request_id: string) {
        return this.holidayModel.findByIdAndUpdate(
            request_id,
            { status: 'rejected'},
            { new: true}
        )
    }

    async getCompanyDefaultHolidaysValue() {
      return this.holidayCapacityDefaultModel.find()
    }

    @OnEvent('user_created')
    async handleCreateUserEvent(user: any) {
        return this.holidayCapacityModel.create({
            'employer_id': user.user_id,
            'fullName': user.name
        })
    }
}
