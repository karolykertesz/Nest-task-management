import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatetaskDto } from 'src/dto/create-task-dto';
import { GetTasksFilterDto } from 'src/dto/create.filter.dto';
import { Task } from './tasks.entity';
// import { TaskModel } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getAllTask(filterDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  createtask(@Body() createDto: CreatetaskDto): Promise<Task> {
    return this.tasksService.createTasks(createDto);
  }
  @Patch()
  updatetask() {}

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deletetaskByid(id);
  }
  @Patch('/:id')
  updateTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.updateTask(id);
  }
}
