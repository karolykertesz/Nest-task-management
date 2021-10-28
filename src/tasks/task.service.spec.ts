import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTaskRepo = () => ({});
describe('testing task service', () => {
  let taskService: TasksService;
  let taskRepository: TaskRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepo },
      ],
    }).compile();
    taskService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });
  //   test('initializing services', () => {});
});
