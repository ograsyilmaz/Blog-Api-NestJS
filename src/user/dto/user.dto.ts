import { IsString, IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm';

export class UserDto {
  @IsString()
  name: string;
  @IsNotEmpty()
  id: ObjectID;
}
