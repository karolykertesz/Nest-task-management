import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create.user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  createuser(@Body() userBody: CreateUserDto) {
    return this.authService.createUser(userBody);
  }
  @Post('/signin')
  userSignIn(@Body() User: CreateUserDto): Promise<string> {
    return this.authService.signIn(User);
  }
}
