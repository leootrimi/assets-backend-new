import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class CalendarEvent {

    @Prop()
    title: string;

    @Prop()
    startTime: string;

    @Prop()
    endTime: string;

    @Prop()
    date: string;

    @Prop()
    description: string;
}

export const CalendarEventSchema = SchemaFactory.createForClass(CalendarEvent);