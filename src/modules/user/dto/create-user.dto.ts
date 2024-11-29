import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressOnRegisterServiceDto } from 'src/modules/address/dto/create-address.dto';

export class CreateUserDto {
  @ApiProperty({
    example: 'client',
    enum: ['client', 'company', 'supplier', 'worker', 'seller'],
  })
  role!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: '$property deve ser string!' }) // personalizando a mensagem de erro e acessando a prorpriedade
  name!: string;

  @ApiProperty({ example: 'client@getnada.com' })
  @IsEmail(undefined, { message: '$property informado é inválido' })
  email!: string;

  @ApiProperty({ example: '123456789' })
  @MinLength(4)
  password!: string;

  @ApiProperty({ example: '12345678910' })
  @MinLength(11)
  cpf!: string;

  @ApiProperty({ example: '(31) 99999-9999' })
  @MinLength(10)
  @MaxLength(25)
  phone!: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  imageUrl!: string;

  @ApiProperty({ example: 'ACTIVE' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  status!: AccountStatus;

  @ApiProperty({ type: CreateAddressOnRegisterServiceDto }) // Use the Address DTO type
  @IsObject({ message: 'o campo $property deve ser um objeto' })
  @Type(() => CreateAddressOnRegisterServiceDto)
  @ValidateNested({ each: true })
  address!: CreateAddressOnRegisterServiceDto; // Instance of the Address DTO

  @ApiProperty({ example: 1, readOnly: true })
  documentsId!: number;
}
