import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersCheckinService } from './users-checkin.service';
import { UserCheckinInfoDto, UsersCheckinDto } from './dto/users.checkin.dto';

@Controller('users-checkin')
export class UsersCheckinController {
    constructor(
        private readonly userCheckinService: UsersCheckinService
    ) {}

    @Post()
    createCheckinForUser(@Body() userChecking: UsersCheckinDto) {
        return this.userCheckinService.createCheckinForUser(userChecking)
    }

    @Get()
    getAllCheckins() {
        return this.userCheckinService.getAllCheckins()
    }

    @Get('/user')
    getCheckinsForUsers(@Body() user: UserCheckinInfoDto) {
        return this.userCheckinService.getUserCheckin(user)
    }
}
