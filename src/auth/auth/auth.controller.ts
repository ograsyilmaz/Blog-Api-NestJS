import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { CreatedUserDto } from '../../user/dto/creat-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async postRegister(@Body() createUserDto: CreatedUserDto) {
    return CreatedUserDto;
  }
}
