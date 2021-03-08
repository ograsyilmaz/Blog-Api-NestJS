import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly password: string;
}
