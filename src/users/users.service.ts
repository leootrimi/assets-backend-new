import { Body, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import mongoose from 'mongoose';
import { Auth0Utility } from 'src/utility/Auth0Utility';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name)
        private usersModel: mongoose.Model<Users>,
        private readonly auth0Utility: Auth0Utility
    ) {}

    async findAll(): Promise<any> {
        const users: any = await this.auth0Utility.fetchAuth0Users();
        const userMetadataList = users
        .filter(user => user.user_metadata) 
        .map(user => ({
            email: user.email,
            picture: user.picture,
            user_id: user.user_id,
            user_metadata: user.user_metadata
        }));

        return userMetadataList;
    }


    async create(createUserDto: CreateUserDto) {
        // return await this.usersModel.create(createUserDto);
        return this.auth0Utility.createAuth0User(createUserDto)
    }

    async delete(id: string) {
        return await this.usersModel.findByIdAndDelete(id)
    }

    async update(id: string, createUserDto: CreateUserDto) {
        // return await this.usersModel.updateOne({_id: id}, createUserDto)
        return await this.auth0Utility.updateUser(id, createUserDto)
    }

    async findById(id: string) {
        // return await this.usersModel.findById(id)
        return await this.auth0Utility.fetchUserById(id);
    }
}
