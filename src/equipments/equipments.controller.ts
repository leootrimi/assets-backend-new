import { Controller, Get, Post, Body, UseGuards, Param, NotFoundException, Put, Req, Inject } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsDto } from './dto/equipments.dto';
import { AuthGuard } from '@nestjs/passport';
import { AssignedToDto } from './dto/assignedTo.dto';
import { log } from 'console';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller('equipments')
export class EquipmentsController {
    constructor(
        private readonly equipmentService: EquipmentsService,
        @Inject('EQUIPMENTS_SERVICE') private readonly equipmentClient: ClientProxy
    ) {}

    @Post()
    create(@Body() equipment: EquipmentsDto, @Req() req: any) {
        return this.equipmentService.create(equipment, req.user);
    }

    // @UseGuards(AuthGuard('jwt'))
    @MessagePattern()
    @Get()
    async findAll() {
        const response = await this.equipmentClient.send('find_equipments', {})
        return response
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        // const equipment = this.equipmentService.findById(id)
        const response = await this.equipmentClient.send('find_by_id', id)
        
        if (!response) {
            throw new NotFoundException('Equipment not found');
        }
        return response
    }

    @Put('/:id')
    updateAssigne(
        @Param('id') id: string,
        @Body() newAssigne: AssignedToDto,
        @Req() req: any
        ) {
        return this.equipmentService.updateAssigne(id, newAssigne, req.user);
    }
}
