import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { TaskToProjectDto } from './dto/task-to-project.dto';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    try {

      const newTask = this.taskRepository.create(createTaskDto);
      await this.taskRepository.save(newTask);

      return newTask;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear la tarea');
    }
  }

  async addTaskToProject(taskId: string, body: TaskToProjectDto) {
    try {

      const { projectId } = body;

      const proyecto = await this.projectRepository.findOne({
        where: { id: projectId },
      });

      if (!proyecto) {
        throw new NotFoundException('Proyecto no encontrado');
      }

      const tarea = await this.taskRepository.findOne({
        where: { id: taskId },
      });

      if (!tarea) {
        throw new NotFoundException('Tarea no encontrada');
      }

      const newTask = this.taskRepository.create({
        ...tarea,
        proyectoId: proyecto
      });

      await this.taskRepository.save(newTask);

    } catch (error) {
      console.log(error);
    }
  }

  async changeTaskStatus(taskId: string, body: any) {
    try {

      const { status } = body;

      const tarea = await this.taskRepository.findOne({
        where: { id: taskId },
      });

      if (!tarea) {
        throw new NotFoundException('Tarea no encontrada');
      }

      const newTask = this.taskRepository.create({
        ...tarea,
        estatus: status
      });

      await this.taskRepository.save(newTask);

    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {

      const tareas = await this.taskRepository.find({
        relations: ['proyectoId']
      });

      return tareas;

    } catch (error) {
      console.log(error);
    }
  }
}
