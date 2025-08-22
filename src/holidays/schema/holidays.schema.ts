import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Date } from "mongoose";
import { getCurrentDate } from "src/utility/Date/date.util";

@Schema()
export class Holiday{
    @Prop()
    employer_id: string
    @Prop()
    employer_name: string
    @Prop({ type: Date, default: getCurrentDate() })
    appliedDate: Date
    @Prop({ type: Date })
    fromDate: Date
    @Prop({ type: Date })
    toDate: Date
    @Prop()
    status: string
    @Prop()
    type: string
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday)

@Schema()
export class HolidayCapacity{
    @Prop()
    employer_id: string
    @Prop()
    fullName: string
    @Prop({ default: 15 })
    workFromHomeDays: number
    @Prop({ default: 25 })
    daysOff: number
    @Prop({default: 14 })
    medicalLeaveDays: number
}

export const HolidayCapacitySchema = SchemaFactory.createForClass(HolidayCapacity)