import { AssignedTo } from "../schema/equipments.schema";

export class EquipmentsDto {
    name: string;
    type: string;
    tag: string;
    serialNo: string;
    price: number;
    assignedTo: AssignedTo;
    assignedDate: string;
}