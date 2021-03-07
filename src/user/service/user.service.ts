import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';
import { CreatedUserDto } from '../dto/creat-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async Login({ name, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { name } });

    if (!user) {
      throw new HttpException('Kullanıcı Bulunamadı.', HttpStatus.UNAUTHORIZED);
    }
    const pswdEqual = password && user.password;

    if (!pswdEqual) {
      throw new HttpException('Giriş Yapılamadı', HttpStatus.UNAUTHORIZED);
    }

    return { name: user.name, id: user.id };
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options);
    return user;
  }
  async findByPayload({ name }: any): Promise<UserDto> {
    return await this.findOne({ where: { name } });
  }

  async create(userDto: CreatedUserDto): Promise<UserDto> {
    const { name, password } = userDto;

    const checkName = await this.userRepository.findOne({ where: { name } });

    if (checkName) {
      throw new HttpException('Kullanıcı Kayıtlıdır.', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.userRepository.create({
      name,
      password,
    });

    await this.userRepository.save(user);
    return { name: user.name, id: user.id };
  }
}
