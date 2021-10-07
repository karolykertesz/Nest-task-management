import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create.user-dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly authRepo: UserRepository) {}
  async createUser(createUser: CreateUserDto): Promise<void> {
    const { username, password } = createUser;
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await this.authRepo.create({ username, password: hashedPass });
    try {
      await this.authRepo.save(user);
    } catch (err) {
      if (parseInt(err.code) == 23505) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException('Error occured');
      }
    }
  }
  async signIn(User: CreateUserDto): Promise<string> {
    const { username, password } = User;
    const user = await this.authRepo.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'hh';
    } else {
      throw new UnauthorizedException('Wrong user credentials');
    }
  }
}
