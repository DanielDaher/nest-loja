import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInputDto {
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  credential: string;

  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  password: string;
}

export class LoginOutputDto {
  accessToken: string;
}

export class PayloadDto {
  id: string;
  role: string;
  name: string;
  profilePicture: string | null;
}
//FAZER MODULO E ROTAS PARA LOGIN.
