import { UserDAO } from './user.dao';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import ErrorMessages from 'src/errors/error-messages';
import { PasswordService } from 'src/shared/services/password/password.service';
import { Pagination } from 'src/shared/value-objects/pagination/pagination';

@Injectable()
export class UserService {
  constructor(
    private userDAO: UserDAO,
    private passwordService: PasswordService,
  ) {}

  async create(data: CreateUserDto) {
    await this.verifyUserExistanceByCredential(
      data.email,
      data.cpf,
      data.phone,
    );

    const newData = {
      ...data,
      password: this.passwordService.hashPassword(data.password),
    };
    const newUser = await this.userDAO.create(newData);
    return newUser;
  }

  async findAll(size?: number, page?: number, search?: string) {
    const users = await this.userDAO.findAll(size, page, search);

    return new Pagination(users, page, size).getResult();
  }

  async findOne(id: number) {
    const register = await this.userDAO.findById(id);

    if (!register) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    return register;
  }

  async update(id: number, data: UpdateUserDto) {
    const register = await this.findOne(id);

    this.verifyInvalidUpdatedFields(data);

    return await this.userDAO.update(register.id, data);
  }

  async remove(id: number) {
    const register = await this.findOne(id);

    return await this.userDAO.remove(register.id);
  }

  async verifyUserExistanceByCredential(
    email: string,
    cpf: string,
    phone: string,
  ) {
    const userWithEmail = await this.userDAO.findByCredential(email);
    const userWithCpf = await this.userDAO.findByCredential(cpf);
    const userWithPhone = await this.userDAO.findByCredential(phone);

    if (userWithCpf || userWithEmail || userWithPhone) {
      throw new ConflictException(ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }
  }

  verifyInvalidUpdatedFields(data: UpdateUserDto) {
    if (data.role) {
      throw new ForbiddenException(ErrorMessages.ROLE_FORBIDDEN_FIELD);
    }

    if (data.status) {
      throw new ForbiddenException(ErrorMessages.STATUS_FORBIDDEN_FIELD);
    }
  }
}
