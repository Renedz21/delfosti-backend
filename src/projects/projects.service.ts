import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project = this.projectRepository.create(createProjectDto);
      await this.projectRepository.save(project);

      return project;

    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const projects = await this.projectRepository.find();
      return projects;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {

      const project = await this.projectRepository.findOne({
        where: {
          id
        },
        relations: ['tareas']
      });

      return project;

    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
