import { Controller, Get, Post, Body, UseGuards, Delete, Put, Param, Req, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';

@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @CacheKey("users-all")
    @CacheTTL(100000)
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

        @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFileForUser(@Req() request: any, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.uploadFileForUser(request, file.originalname, file.buffer)
    }

    @Get('/upload')
    listUserFiles(@Req() request: any) {
        return this.usersService.listUserFiles(request)
    }

    @Get(":id")
    findById(@Param('id') id: string ) {
        return this.usersService.findById(id)
    }
}
