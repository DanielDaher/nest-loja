import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Swagger } from 'src/shared/openapi/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Swagger({
    summary: 'Rota para cadastrar um novo endereço de um usuário',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    createdResponse: CreateAddressDto,
    tags: ['Gerencial - Endereço', 'User - Endereço'],
  })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @Swagger({
    summary: 'Rota para listar todos os endereços cadastrados',
    description: `
      ## - Somente admin consegue listar todos os endereços.
    `,
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: [CreateAddressDto],
    tags: ['Gerencial - Endereço'],
  })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @Swagger({
    summary: 'Rota para buscar os endereços pelo id',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateAddressDto,
    tags: ['Gerencial - Endereço', 'User - Endereço'],
  })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  @Swagger({
    summary: 'Rota para editar informações de um endereço',
    description: `## - Não há necessidade de enviar todos os parâmetros, apenas aqueles que deseja editar.
      
      - Usuários comuns só conseguem editar dados de si mesmo. Admin consegue de todos.`,
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateAddressDto,
    tags: ['Gerencial - Endereço', 'User - Endereço'],
  })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @Swagger({
    summary: 'Rota para deletar um endereço',
    description:
      'Somente admins conseguem deletar qualquer endereço. Os demais usuários conseguem deletar só os que estão atrelados aos seus próprios accountIds.',
    applyBadRequest: true,
    applyUnauthorized: true,
    applyForbidden: true,
    applyBearerAuth: true,
    okResponse: CreateAddressDto,
    tags: ['Gerencial - Endereço', 'User - Endereço'],
  })
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}