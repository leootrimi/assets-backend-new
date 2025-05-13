import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarEvent, CalendarEventSchema } from './schema/calendarEvent.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CalendarEvent.name, schema: CalendarEventSchema}])],
  controllers: [CalendarController],
  providers: [CalendarService]
})
export class CalendarModule {}
