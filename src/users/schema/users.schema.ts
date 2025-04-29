import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Users {

    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop({ required: true, unique: true})
    email: string;

    @Prop()
    position: string

    @Prop()
    level: string

    @Prop()
    country: string

    @Prop()
    city: string

    @Prop()
    state: string

    @Prop()
    zipCode: string
}

export const UsersSchema = SchemaFactory.createForClass(Users)