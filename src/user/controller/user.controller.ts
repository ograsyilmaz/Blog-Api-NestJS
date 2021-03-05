import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entity/user.entity';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
}
