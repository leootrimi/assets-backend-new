import { Body, Controller, Get, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarEventDto } from './dto/CalendarEvent.dto';

@Controller('calendar')
export class CalendarController {
    constructor( private readonly calendarService: CalendarService ) {}

    @Post()
    create(@Body() calendarEvent: CalendarEventDto) {
        return this.calendarService.create(calendarEvent)
    }

    @Get()
    find() {
        return this.calendarService.find();
    }
}
