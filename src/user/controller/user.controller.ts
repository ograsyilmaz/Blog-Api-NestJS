import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  create(): string {
    return 'Post Methodudur';
  }

  @Get()
  findAll(): string {
    return ' Get methodurur';
  }
}
