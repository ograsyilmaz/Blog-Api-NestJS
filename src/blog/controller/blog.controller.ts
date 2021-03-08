import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreatedBlogDto } from '../dto/creat-blog.dto';
import { BlogDto } from '../dto/blog.dto';
import { BlogService } from '../service/blog.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../../user/dto/user.dto';
import { CreatedUserDto } from 'src/user/dto/creat-user.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() CreatedblogDto: CreatedBlogDto,
    @Req() req: any,
  ): Promise<BlogDto> {
    const user = req.user as UserDto;

    return await this.blogService.createBlog(user, CreatedblogDto);
  }
}
