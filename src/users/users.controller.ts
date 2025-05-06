import { Controller, Get, Post, Body, UseGuards, Delete, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Delete()
    delete(@Body() id: string) {
        return this.usersService.delete(id)
    }

    @Put()
    update(@Body() body: {id: string, updateUser: CreateUserDto}) {
        return this.usersService.update(body.id, body.updateUser)
    }

    @Get(":id")
    findById(@Param('id') id: string ) {
        return this.usersService.findById(id)
    }
}
