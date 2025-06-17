import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Projects, ProjectSchema } from './schema/projects.schema';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Projects.name, schema: ProjectSchema
  }]), SharedModule],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
