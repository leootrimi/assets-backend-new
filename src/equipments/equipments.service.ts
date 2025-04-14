import { Injectable } from '@nestjs/common';
import { EquipmentsDto } from './dto/equipments.dto';

@Injectable()
export class EquipmentsService {
    private equipments: EquipmentsDto[] = [];

    create(equipment: EquipmentsDto) {
        const newEquipment = { ...equipment };
        this.equipments.push(newEquipment);
        return newEquipment
    }

    findAll() {
        return this.equipments
    }
}
