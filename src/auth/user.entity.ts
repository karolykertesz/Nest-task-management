import { Task } from 'src/tasks/tasks.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
