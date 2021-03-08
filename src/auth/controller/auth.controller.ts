import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatedUserDto } from '../../user/dto/creat-user.dto';
import { RegisterStatus } from '../interface/register-status.interface';
import { AuthService } from '../service/auth.service';
import { LoginStatus } from '../interface/login-status.interface';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { JwtPayload } from '../interface/payload.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreatedUserDto,
  ): Promise<RegisterStatus> {
    const result: RegisterStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('status')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
