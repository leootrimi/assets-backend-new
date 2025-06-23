import { Controller, Get, Post, Body, UseGuards, Delete, Put, Param, Req, Query, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @CacheKey("users-all")
    @CacheTTL(100000)
    @Get()
    findAll(@Query('companyId') companyId: string) {
        return this.usersService.findAll(companyId)
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
