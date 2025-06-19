import { AssignedTo } from "../schema/equipments.schema";

export class Company {
    id: string;
    companyName: string;
}

export class EquipmentsDto {
    name: string;
    type: string;
    tag: string;
    serialNo: string;
    price: number;
    assignedTo: AssignedTo;
    assignedDate: string;
    company: Company;
}