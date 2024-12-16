import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Swagger } from 'src/shared/openapi/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Queries } from 'src/shared/validators/dtos/queries.dto';
import { RequiredRoles } from '../authentication/decorators/required-role.decorator';
import { AccountRole } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @RequiredRoles(AccountRole.ADMIN)
  @Swagger({
    summary: 'Rota para cadastrar um novo colaborador',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    createdResponse: CreateAdminDto,
    tags: ['Gerencial - Colaborador'],
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @RequiredRoles(AccountRole.ADMIN)
  @Swagger({
    summary: 'Rota para listar todos os colaboradores',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okPaginatedResponse: CreateAdminDto,
    tags: ['Gerencial - Colaborador'],
  })
  async findAll(@Query() queries: Queries) {
    const { size, page, search } = queries;
    return await this.adminService.findAll(size, page, search);
  }

  @Get(':id')
  @RequiredRoles(AccountRole.ADMIN)
  @Swagger({
    summary: 'Rota para buscar um colaborador pelo id',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateAdminDto,
    tags: ['Gerencial - Colaborador'],
  })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @RequiredRoles(AccountRole.ADMIN)
  @Swagger({
    summary: 'Rota para editar informações de um colaborador',
    description:
      '## - Não há necessidade de enviar todos os parâmetros, apenas aqueles que deseja editar',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateAdminDto,
    tags: ['Gerencial - Colaborador'],
  })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @RequiredRoles(AccountRole.ADMIN)
  @Swagger({
    summary: 'Rota para deletar um colaborador',
    description:
      '## Somente admin_master consegue deletar um colaborador. Os demais admins podem alterar o status, caso queiram cancelar.',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateAdminDto,
    tags: ['Gerencial - Colaborador'],
  })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
