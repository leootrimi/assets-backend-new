import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users: CreateUserDto[] = [];

    create(user: CreateUserDto) {
        const newUser = { ...user };
        this.users.push(newUser);
        return newUser;
    }

    findAll() {
        return this.users;
    }
}
