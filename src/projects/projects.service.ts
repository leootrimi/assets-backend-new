import { Injectable } from '@nestjs/common';
import { ProjectsDto } from './dto/projects.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Projects } from './schema/projects.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectModel(Projects.name)
        private projectsModel: Model<Projects>
    ) {}

    async create(project: ProjectsDto): Promise<Projects> {
        return await this.projectsModel.create(project);
    }

    async find(): Promise<Projects[]> {
        return await this.projectsModel.find();
    }

    async findByOwnerId(ownerId: string): Promise<Projects[]> {
        return await this.projectsModel.find({ ownerId }).exec();
    }
}
