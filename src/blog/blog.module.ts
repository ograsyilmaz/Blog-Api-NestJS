import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './service/blog.service';
import { BlogController } from './controller/blog.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { BlogEntity } from './entity/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), AuthModule, UserModule],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
