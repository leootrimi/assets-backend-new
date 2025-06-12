import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false }) 
export class UserCheckinInfo {
  @Prop()
  id: string;

  @Prop()
  fullName: string;
}

@Schema()
export class UserCheckin {

    @Prop()
    user: UserCheckinInfo

    @Prop()
    checkinDate: string

    @Prop()
    checkinTime: string

    @Prop()
    checkoutTime: string
}

export const UserCheckinSchema = SchemaFactory.createForClass(UserCheckin)