import { Injectable } from '@nestjs/common';
import { ProjectsDto } from './dto/projects.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Projects } from './schema/projects.schema';
import { Model } from 'mongoose';
import { Auth0Utility } from 'src/utility/Auth0Utility';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectModel(Projects.name)
        private projectsModel: Model<Projects>,
        private readonly auth0Utility: Auth0Utility
    ) {}

    async create(project: ProjectsDto) {
        return await this.projectsModel.create(project);
    }

    async find(): Promise<Projects[]> {
        return await this.projectsModel.find();
    }

    async findByOwnerId(ownerId: string): Promise<Projects[]> {
        return await this.projectsModel.find({ ownerId }).exec();
    }
}
