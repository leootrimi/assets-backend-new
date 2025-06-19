import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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
}
