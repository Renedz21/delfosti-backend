import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { PassportModule } from '@nestjs/passport';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    TypeOrmModule.forFeature([Task, Project]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  exports: [
    TypeOrmModule
  ]
})
export class TaskModule { }
