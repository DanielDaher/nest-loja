import { UserService } from './user.service';
import { Swagger } from 'src/shared/openapi/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Swagger({
    summary: 'Rota para cadastrar um novo usuário',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    createdResponse: CreateUserDto,
    tags: ['Gerencial - Cadastros', 'User - Cadastros'],
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Swagger({
    summary: 'Rota para buscar todos os usuários cadastrados',
    description: '## Somente o admin consegue listar todos os usuários',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: [CreateUserDto],
    tags: ['Gerencial - Cadastros', 'User - Cadastros'],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Swagger({
    summary: 'Rota para buscar um usuário pelo id',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateUserDto,
    tags: ['Gerencial - Cadastros', 'User - Cadastros'],
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Swagger({
    summary: 'Rota para editar um usuário pelo id',
    description:
      '## Clientes e prestadores conseguem editar apenas seus próprios dados. O admin consegue editar todos, sem descrição.',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateUserDto,
    tags: ['Gerencial - Cadastros', 'User - Cadastros'],
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Swagger({
    summary: 'Rota para deletar um usuário pelo id',
    description:
      '## Clientes e prestadores conseguem deletar apenas seus próprios dados. O admin consegue deletar todos, sem descrição.',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateUserDto,
    tags: ['Gerencial - Cadastros', 'User - Cadastros'],
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
