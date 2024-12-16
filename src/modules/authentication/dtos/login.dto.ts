import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInputDto {
  @ApiProperty({ example: 'user@getnada.com' })
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  credential!: string;

  @ApiProperty({ example: '123456789' })
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  password!: string;
}

export class LoginAdmInputDto {
  @ApiProperty({ example: 'admin@getnada.com' })
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  credential!: string;

  @ApiProperty({ example: '123456789' })
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  password!: string;
}

export class LoginOutputDto {
  id!: number;
  accessToken!: string;
}

export class PayloadDto {
  id: string;
  role: string;
  name: string;
  imageUrl: string | null;
}
