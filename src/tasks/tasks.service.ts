import { Injectable } from '@nestjs/common';
import { TaskModel } from './tasks.model';
import { TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];
  getTasks(): TaskModel[] {
    return this.tasks;
  }
  createTasks(title: string, description: string): TaskModel {
    const task: TaskModel = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
