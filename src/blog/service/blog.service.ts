import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BlogEntity } from '../entity/blog.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { CreatedBlogDto } from '../dto/creat-blog.dto';
import { BlogDto } from '../dto/blog.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/service/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepo: Repository<BlogEntity>,
    private readonly userService: UserService,
  ) {}

  async createBlog(
    { name }: UserDto,
    createBlogDto: CreatedBlogDto,
  ): Promise<BlogDto> {
    const { title, description } = createBlogDto;
    const author = await this.userService.findOne({ name });
    const blog: BlogEntity = this.blogRepo.create({
      title,
      description,
      author,
    });

    await this.blogRepo.save(blog);
    return blog;
  }
}
