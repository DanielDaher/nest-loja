import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Swagger } from 'src/shared/openapi/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Swagger({
    tags: ['Gerencial - Autenticação', 'User - Autenticação'],
    summary: 'Login',
    applyBadRequest: true,
    okResponse: LoginOutputDto,
  })
  async login(@Body() body: LoginInputDto): Promise<LoginOutputDto> {
    return await this.authenticationService.login(body);
  }
}
