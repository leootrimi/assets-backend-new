import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Projects {
    @Prop()
    company: string

    @Prop()
    sector: string

    @Prop()
    address: string

    @Prop()
    city: string

    @Prop()
    country: string

    @Prop()
    owner: string

    @Prop()
    ownerId: string

    @Prop()
    email: string

    @Prop()
    phoneNumber: string
}

export const ProjectSchema = SchemaFactory.createForClass(Projects);