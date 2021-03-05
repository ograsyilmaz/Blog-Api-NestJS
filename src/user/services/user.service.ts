import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  async create(creatUserdto: UserDto): Promise<UserEntity> {
    const user = new UserEntity();

    user.name = creatUserdto.name;
    user.password = creatUserdto.password;
    return this.userRepository.save(user);
  }
}
