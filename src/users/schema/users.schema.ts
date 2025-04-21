import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Users {

    @Prop({ required: true, unique: true})
    email: string;

    @Prop()
    password: string
}

export const UsersSchema = SchemaFactory.createForClass(Users)