import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false }) 
export class AssignedTo {
  @Prop()
  id: string;

  @Prop()
  fullName: string;
}

@Schema()
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
}

export const EquipmentsSchema = SchemaFactory.createForClass(Equipments);