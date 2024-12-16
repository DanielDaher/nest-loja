import { ApiProperty } from '@nestjs/swagger';
import {
  // IsEmail,
  IsNotEmpty,
  IsString,
  // MaxLength,
  // MinLength,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 1 })
  userId!: number;

  @ApiProperty({ example: 1, readOnly: true })
  id!: number;

  @ApiProperty({ example: '12345-678' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  zipcode!: string;

  @ApiProperty({ example: 'Street Name' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  street!: string;

  @ApiProperty({ example: '123' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  number!: string;

  @ApiProperty({ example: 'Apartment 101' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  complement!: string;

  @ApiProperty({ example: 'Neighborhood' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  district!: string;

  @ApiProperty({ example: 'City Name' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  city!: string;

  @ApiProperty({ example: 'State' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  state!: string;

  @ApiProperty({ example: '2024-08-28T12:24:49Z', readOnly: true })
  createdAt!: Date;

  @ApiProperty({ example: '2024-08-28T12:24:49Z', readOnly: true })
  updatedAt!: Date;
}

export class CreateAddressOnRegisterServiceDto {
  @ApiProperty({ example: 1, readOnly: true })
  id!: number;

  @ApiProperty({ example: '12345-678' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  zipcode!: string;

  @ApiProperty({ example: 'Street Name' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  street!: string;

  @ApiProperty({ example: '123' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  number!: string;

  @ApiProperty({ example: 'Apartment 101' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  complement!: string;

  @ApiProperty({ example: 'Neighborhood' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  district!: string;

  @ApiProperty({ example: 'City Name' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  city!: string;

  @ApiProperty({ example: 'State' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  state!: string;

  @ApiProperty({ example: '2024-08-28T12:24:49Z', readOnly: true })
  createdAt!: Date;

  @ApiProperty({ example: '2024-08-28T12:24:49Z', readOnly: true })
  updatedAt!: Date;
}

export class CreateNewAddressDto {
  @ApiProperty({ example: 1 })
  userId!: number;

  @ApiProperty({ example: '12345-678' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  zipcode!: string;

  @ApiProperty({ example: 'Street Name' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  street!: string;

  @ApiProperty({ example: '123' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  number!: string;

  @ApiProperty({ example: 'Apartment 101' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  complement!: string;

  @ApiProperty({ example: 'Neighborhood' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  district!: string;

  @ApiProperty({ example: 'City Name' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  city!: string;

  @ApiProperty({ example: 'State' })
  @IsString({ message: '$property deve ser string!' })
  @IsNotEmpty({ message: 'o campo $property precisa estar preenchido' })
  state!: string;

  @ApiProperty({ example: '2024-08-28T12:24:49Z', readOnly: true })
  createdAt!: Date;

  @ApiProperty({ example: '2024-08-28T12:24:49Z', readOnly: true })
  updatedAt!: Date;
}
