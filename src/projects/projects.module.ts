import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    TypeOrmModule.forFeature([Project]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  exports: [
    TypeOrmModule
  ]
})
export class ProjectsModule { }
