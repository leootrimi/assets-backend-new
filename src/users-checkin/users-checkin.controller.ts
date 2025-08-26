import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UsersCheckinService } from './users-checkin.service';

@Controller('users-checkin')
export class UsersCheckinController {
    constructor(
        private readonly userCheckinService: UsersCheckinService
    ) {}

    @Post()
    createCheckinForUser(@Req() request: any) {
        return this.userCheckinService.createCheckinForUser(request)
    }

    @Get()
    getAllCheckins() {
        return this.userCheckinService.getAllCheckins()
    }

    @Post('/checkout')
    checkoutForUser(@Req() request: any) {
        return this.userCheckinService.checkoutForUser(request)
    }

    @Post('/user')
    getCheckinsForUser(@Req() request: any) {
        return this.userCheckinService.getUserCheckin(request)
    }

    @Get(':id/activity')
    getActivityForUser(@Param('id') id: string ) {
        return this.userCheckinService.getActivityForUser(id);
    }
}
