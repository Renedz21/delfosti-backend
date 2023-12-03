import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { VALID_ROLES } from 'src/auth/interfaces/valid-roles';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { TaskToProjectDto } from './dto/task-to-project.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  @Auth(VALID_ROLES.ADMIN_KEY)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Patch(':taskId')
  @Auth(VALID_ROLES.ADMIN_KEY)
  addTaskToProject(
    @Param('taskId') taskId: string,
    @Body() body: TaskToProjectDto
  ) {
    return this.taskService.addTaskToProject(taskId, body);
  }

  @Patch(':taskId/status')
  @Auth(VALID_ROLES.ADMIN_KEY, VALID_ROLES.CUSTOMER_KEY)
  changeTaskStatus(
    @Param('taskId') taskId: string,
    @Body() body: any
  ) {
    return this.taskService.changeTaskStatus(taskId, body);
  }

  @Get()
  @Auth(VALID_ROLES.ADMIN_KEY, VALID_ROLES.CUSTOMER_KEY)
  findAll() {
    return this.taskService.findAll();
  }
}
