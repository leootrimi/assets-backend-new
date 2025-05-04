import { Body, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name)
        private usersModel: mongoose.Model<Users>
    ) {}

    async findAll(): Promise<Users[]> {
        const users = await this.usersModel.find();
        return users
    }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        return await this.usersModel.create(createUserDto);
    }

    async delete(id: string) {
        return await this.usersModel.findByIdAndDelete(id)
    }

    async update(id: string, createUserDto: CreateUserDto) {
        return await this.usersModel.updateOne({_id: id}, createUserDto)
    }

    async findById(id: string) {
        return await this.usersModel.findById(id)
    }
}
