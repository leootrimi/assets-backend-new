import { Injectable } from '@nestjs/common';
import { EquipmentsDto } from './dto/equipments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipments } from './schema/equipments.schema';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentsService {
    constructor(
        @InjectModel(Equipments.name)
        private equipmentsModel: Model<Equipments>
    ) {}

    async create(equipment: EquipmentsDto): Promise<Equipments> {
        return await this.equipmentsModel.create(equipment)
    }

    async findAll() {
        return await this.equipmentsModel.find();
    }
}
