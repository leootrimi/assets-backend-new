import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsDto } from './dto/equipments.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('equipments')
export class EquipmentsController {
    constructor(private readonly equipmentService: EquipmentsService) {}

    @Post()
    create(@Body() equipment: EquipmentsDto) {
        return this.equipmentService.create(equipment);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.equipmentService.findAll()
    }
}
