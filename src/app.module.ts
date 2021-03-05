import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, DbModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
