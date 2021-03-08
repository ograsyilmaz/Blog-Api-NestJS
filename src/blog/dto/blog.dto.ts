import { UserDto } from '../../user/dto/user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectID } from 'typeorm';

export class BlogDto {
  @IsString()
  title: string;
  @IsNotEmpty()
  id: ObjectID;
  @IsString()
  @IsNotEmpty()
  description: string;

  author?: UserDto;
}
