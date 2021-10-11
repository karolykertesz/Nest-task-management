import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskModel } from './tasks.model';
import { TaskStatus } from './tasks.model';
import { TaskRepository } from './task.repository';
import { CreatetaskDto } from 'src/dto/create-task-dto';
import { Task } from './tasks.entity';
import { GetTasksFilterDto } from 'src/dto/create.filter.dto';
import { getManager, getRepository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {
    console.log('j');
  }
  async createTasks(createTaskDto: CreatetaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.taskRepository.save(task);
    return task;
  }
  async getAllTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    if (status) {
      const task = await getManager()
        .createQueryBuilder(Task, 'task')
        .andWhere('task.status = :status', { status })
        .getMany();
      return task;
    }
  }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ id: id });
    if (!task) {
      throw new NotFoundException('No id by!');
    }
    return task;
  }
  async deletetaskByid(id: string): Promise<void> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('No task by this id');
    }
    await this.taskRepository.remove(task);
  }
  async updateTask(id: string): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = TaskStatus.DONE;
    await this.taskRepository.save(task);
    return task;
  }
  // getTaskById(id: string): TaskModel {
  //   const task: TaskModel = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with id ${id} not found!`);
  //   }
  //   return task;
  // }
  // deletetask(id: string): TaskModel[] {
  //   const task: TaskModel = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with id ${id} not found!`);
  //   }
  //   return this.tasks.filter((tas) => tas.id !== id);
  // }
}
