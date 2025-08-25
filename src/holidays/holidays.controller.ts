import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { HolidayDto } from './dto/holidays.dto';

@Controller('holidays')
export class HolidaysController {
    constructor(
        private readonly holidaysService: HolidaysService
    ) {}

    @Post()
    create(@Req() request: any, @Body() holiday: HolidayDto) {
        return this.holidaysService.create(request, holiday);
    }

    @Get('/all')
    getAllHolidayRequests() {
        return this.holidaysService.getAllHolidayRequests();
    }

    @Get()
    getHolidaysForUser(@Req() request: any) {
        return this.holidaysService.getHolidayForUser(request);
    }

    @Post('/capacity')
    createHolidayCapacityForUser(@Body() body: any) {
        return this.holidaysService.createHolidayCapacityForUser(body)
    }

    @Get('/capacity')
    getHolidayCapacityForUser(@Req() request: any) {
        return this.holidaysService.getHolidayCapacityForUser(request)
    }

    @Get('/upcoming/requests')
    getUpcomingHolidaysRequest(@Query('companyId') company_id: string, @Req() request: any) {
        return this.holidaysService.getUpcomingHolidaysRequest(company_id, request)
    }

    @Get('accept')
    acceptHolidayRequest(@Query('requestId') request_id: string, @Query('employerId') employer_id: string) {
        return this.holidaysService.acceptHolidayRequest(request_id, employer_id)
    }

    @Get('reject')
    rejectHolidayRequest(@Query('requestId') request_id: string) {
        return this.holidaysService.rejectHolidayRequest(request_id)
    }
}
