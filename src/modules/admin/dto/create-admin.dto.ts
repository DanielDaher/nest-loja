import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsArray,
} from 'class-validator';
import { AccountRole, AccountStatus } from '@prisma/client';

export class CreateAdminDto {
  @ApiProperty({
    example: 'ADMIN',
    enum: ['ADMIN', 'ADMIN_MASTER', 'COMPANY', 'SUPPLIER', 'WORKER', 'SELLER'],
  })
  @IsNotEmpty({ message: '$property deve estar preenchido!' })
  role!: AccountRole;

  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: '$property deve estar preenchido!' })
  name!: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do administrador',
  })
  @IsString({ message: '$property deve ser string!' })
  @MinLength(11, { message: '$property deve ter pelo menos 11 caracteres!' })
  @MaxLength(14, { message: '$property deve ter no máximo 14 caracteres!' })
  cpf!: string;

  @ApiProperty({ example: 'admin@getnada.com' })
  @IsEmail({}, { message: '$property deve ser um e-mail válido!' })
  @IsNotEmpty({ message: '$property deve estar preenchido!' })
  email!: string;

  @ApiProperty({ example: 'senhaSegura123' })
  @IsString({ message: '$property deve ser string!' })
  @MinLength(4, { message: '$property deve ter pelo menos 4 caracteres!' })
  @IsNotEmpty({ message: '$property deve estar preenchido!' })
  password!: string;

  @ApiProperty({
    example: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
    description: 'Status da conta',
  })
  @IsNotEmpty({ message: '$property deve estar preenchido!' })
  status!: AccountStatus;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    required: false,
    description: 'URL da imagem de perfil do administrador',
  })
  @IsOptional()
  @IsString({ message: '$property deve ser string!' })
  imageUrl?: string;

  @ApiProperty({
    example: 'abc123',
    readOnly: true,
    required: false,
    description: 'Código de verificação',
  })
  @IsOptional()
  @IsString({ message: '$property deve ser string!' })
  code?: string;

  @ApiProperty({
    example: '2024-09-01T12:00:00Z',
    readOnly: true,
    required: false,
    description: 'Data de expiração do código de verificação',
  })
  @IsOptional()
  codeExpiresIn?: Date;

  @ApiProperty({
    example: '2024-01-01T12:00:00Z',
    readOnly: true,
    description: 'Data de criação do administrador',
  })
  @IsOptional()
  createdAt!: Date;

  @ApiProperty({
    example: '2024-01-02T12:00:00Z',
    readOnly: true,
    description: 'Última atualização do administrador',
  })
  @IsOptional()
  updatedAt!: Date;

  @ApiProperty({
    example: [1, 2, 3],
    writeOnly: true,
    description: 'Array de permissões (somente Ids)',
  })
  @IsOptional()
  @IsArray({ message: '$property deve ser um array de números' })
  permissionsIds?: number[];
}
