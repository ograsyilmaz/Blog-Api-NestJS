import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';
import { CreatedUserDto } from '../dto/creat-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(userDto: CreatedUserDto): Promise<UserDto> {
    const { name, password } = userDto;

    const checkName = await this.userRepository.findOne({ where: { name } });

    if (checkName) {
      throw new HttpException('Kullanıcı ismi vardır', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.userRepository.create({
      name,
      password,
    });

    await this.userRepository.save(user);
    return { name: user.name, id: user.id };
  }
}
