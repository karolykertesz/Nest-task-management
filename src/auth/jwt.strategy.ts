import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './auth.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {
    super({
      secretOrKey: '12igiglYhggg',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  private async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepo.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('No User, Sorry!!');
    }
    return user;
  }
}
