import { Body, Controller, Get, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsDto } from './dto/projects.dto';

@Controller('projects')
export class ProjectsController {

    constructor(
        private readonly projectService: ProjectsService
    ) {}

    @Post()
    create(@Body() project: ProjectsDto) {
        return this.projectService.create(project);
    }

    @Get()
    find() {
        return this.projectService.find();
    }

    @Get('/owner')
    async getProjects(@Query('ownerId') ownerId?: string) {
        try {
          console.log('Received ownerId:', ownerId);
          if (ownerId) {
            return await this.projectService.findByOwnerId(ownerId);
          } else {
            return [];
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
          throw new InternalServerErrorException('Unable to fetch projects');
        }
      }
}
