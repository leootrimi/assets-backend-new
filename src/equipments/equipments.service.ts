import { Injectable } from '@nestjs/common';
import { EquipmentsDto } from './dto/equipments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipments } from './schema/equipments.schema';
import { Model } from 'mongoose';
import { AssignedToDto } from './dto/assignedTo.dto';

@Injectable()
export class EquipmentsService {
    constructor(
        @InjectModel(Equipments.name)
        private equipmentsModel: Model<Equipments>
    ) {}

    async create(equipment: EquipmentsDto): Promise<Equipments> {
        const activity = {
            user: 'John Doe',
            activity: 'Created equipment details',
            date: new Date(),
        };
        const newEquipment = await this.equipmentsModel.create({
            ...equipment,
            activity: [activity],
        });
        return newEquipment
    }

    async findAll(): Promise<Equipments[]> {
        return await this.equipmentsModel.find();
    }

    async findById(id: string): Promise<Equipments | null> {
        return await this.equipmentsModel.findOne({ _id: id });
    }
    
    async updateAssigne(id: string, assign: AssignedToDto) {
        const activity = {
            user: 'John Doe',
            activity: 'Updated equipment details',
            date: new Date(),
        };

        return await this.equipmentsModel.updateOne(
            { _id: id },
            {
                $set: { assignedTo: assign },
                $push: { activity: activity },
            }
        );
    }
}
