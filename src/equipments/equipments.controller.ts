import { Controller, Get, Post, Body, UseGuards, Param, NotFoundException, Put } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsDto } from './dto/equipments.dto';
import { AuthGuard } from '@nestjs/passport';
import { AssignedToDto } from './dto/assignedTo.dto';

@Controller('equipments')
export class EquipmentsController {
    constructor(private readonly equipmentService: EquipmentsService) {}

    @Post()
    create(@Body() equipment: EquipmentsDto) {
        return this.equipmentService.create(equipment);
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.equipmentService.findAll()
    }

    @Get('/:id')
    findById(@Param('id') id: string) {
        const equipment = this.equipmentService.findById(id)
        if (!equipment) {
            throw new NotFoundException('Equipment not found');
        }
        return equipment
    }

    @Put('/:id')
    updateAssigne(@Param('id') id: string, @Body() newAssigne: AssignedToDto) {
        return this.equipmentService.updateAssigne(id, newAssigne);
    }
}
