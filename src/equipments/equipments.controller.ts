import { Controller, Get, Post, Body } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsDto } from './dto/equipments.dto';

@Controller('equipments')
export class EquipmentsController {
    constructor(private readonly equipmentService: EquipmentsService) {}

    @Post()
    create(@Body() equipment: EquipmentsDto) {
        return this.equipmentService.create(equipment);
    }

    @Get()
    findAll() {
        return this.equipmentService.findAll()
    }
}
