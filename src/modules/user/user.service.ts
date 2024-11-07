import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDAO } from './user.dao';

@Injectable()
export class UserService {
  constructor(private userDao: UserDAO) {}

  async create(data: CreateUserDto) {
    return await this.userDao.create(data);
  }

  async findAll() {
    return await this.userDao.findAll();
  }

  async findOne(id: number) {
    return await this.userDao.findById(id);
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.userDao.update(id, data);
  }

  async remove(id: number) {
    return await this.userDao.remove(id);
  }
}
