import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CalendarEvent } from './schema/calendarEvent.schema';
import { CalendarEventDto } from './dto/CalendarEvent.dto';
import { Model } from 'mongoose';

@Injectable()
export class CalendarService {
    constructor(
        @InjectModel(CalendarEvent.name)
        private calendarEvent: Model<CalendarEvent>
    ) {}

    async create(@Body() calendarEvent: CalendarEventDto): Promise<CalendarEvent> {
        return await this.calendarEvent.create(calendarEvent);
    }

    async find(): Promise<CalendarEvent[]> {
        return await this.calendarEvent.find();
    }
}
