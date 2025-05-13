import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false }) 
export class AssignedTo {
  @Prop()
  id: string;

  @Prop()
  fullName: string;
}

@Schema()
export class Activity {
    @Prop({ required: true })
    user: string;

    @Prop({ required: true })
    activity: string;

    @Prop({ required: true, default: Date.now })
    date: Date;
}

@Schema({ timestamps: true })
export class Equipments {
    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    tag: string;

    @Prop()
    serialNo: string;

    @Prop()
    price: number;

    @Prop({ type: AssignedTo})
    assignedTo: AssignedTo;

    @Prop()
    assignedDate: string;

    @Prop({ type: [Activity], default: [] })
    activity: Activity[];
}

export const EquipmentsSchema = SchemaFactory.createForClass(Equipments);