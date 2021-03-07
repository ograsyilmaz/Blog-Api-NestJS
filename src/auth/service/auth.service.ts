import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatedUserDto } from '../../user/dto/creat-user.dto';
import { RegisterStatus } from '../interface/register-status.interface';
import { UserService } from '../../user/service/user.service';
import { LoginStatus } from '../interface/login-status.interface';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { UserDto } from '../../user/dto/user.dto';
import { JwtPayload } from '../interface/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreatedUserDto): Promise<RegisterStatus> {
    let status: RegisterStatus = {
      success: true,
      message: 'User Kayıt Yapıldı',
    };
    try {
      await this.userService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.userService.Login(loginUserDto);

    const token = this._createToken(user);

    return {
      name: user.name,
      ...token,
    };
  }
  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ name }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { name };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
