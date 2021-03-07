import { IsNotEmpty, IsString } from 'class-validator';

export class CreatedBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
