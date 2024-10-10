import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'client',
    enum: ['client', 'company', 'supplier', 'worker', 'seller'],
  })
  role!: string;

  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: 'client@getnada.com' })
  email!: string;

  @ApiProperty({ example: '123456789' })
  password!: string;

  @ApiProperty({ example: '12345678910' })
  cpf!: string;

  @ApiProperty({ example: '(31) 99999-9999' })
  phone!: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  imageUrl!: string;

  @ApiProperty({ example: 'ACTIVE' })
  status!: string;
}
