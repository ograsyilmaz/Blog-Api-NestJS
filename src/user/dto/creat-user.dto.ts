import { IsNotEmpty, IsString } from 'class-validator';

export class CreatedUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
