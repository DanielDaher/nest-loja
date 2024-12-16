import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminDAO } from './dao/admin.dao';
import { PasswordService } from 'src/shared/services/password/password.service';
import { Pagination } from 'src/shared/value-objects/pagination/pagination';
import errorMessages from 'src/errors/error-messages';

@Injectable()
export class AdminService {
  constructor(
    private adminDAO: AdminDAO,
    private passwordService: PasswordService,
  ) {}

  async create(data: CreateAdminDto) {
    const { permissionsIds } = data;

    await this.verifyAdminExistanceByCredential(data.email, data.cpf);
    await this.verifyPermissions(permissionsIds);

    const newData = {
      ...data,
      password: this.passwordService.hashPassword(data.password),
    };
    const newAdmin = await this.adminDAO.create(newData);
    return newAdmin;
  }

  async findAll(size?: number, page?: number, search?: string) {
    const admins = await this.adminDAO.findAll(size, page, search);

    return new Pagination(admins, page, size).getResult();
  }

  async findOne(id: number) {
    const admin = await this.adminDAO.findById(id);

    if (!admin) {
      throw new NotFoundException(errorMessages.ADMIN_NOT_FOUND);
    }

    return admin;
  }

  async update(id: number, data: UpdateAdminDto) {
    const { permissionsIds } = data;
    await this.verifyPermissions(permissionsIds);

    await this.findOne(id);

    const updatedAdmin = await this.adminDAO.update(id, data);
    return updatedAdmin;
  }

  async remove(id: number) {
    const admin = await this.findOne(id);

    return await this.adminDAO.remove(admin.id);
  }

  async verifyAdminExistanceByCredential(email: string, cpf: string) {
    const adminWithEmail = await this.adminDAO.findByCredential(email);
    const adminWithCpf = await this.adminDAO.findByCredential(cpf);

    if (adminWithEmail || adminWithCpf) {
      throw new ConflictException(errorMessages.ACCOUNT_ALREADY_EXISTS);
    }
  }

  async verifyPermissions(permissionsIds: number[] | undefined) {
    if (permissionsIds) {
      await Promise.all(
        permissionsIds.map(
          async (permissionId) =>
            await this.adminDAO.validatePermissions(permissionId),
        ),
      );
    }
    return;
  }
}
