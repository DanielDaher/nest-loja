import ErrorMessages from 'src/errors/error-messages';
import { AuthenticationDAO } from './authentication.dao';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtAuthService } from 'src/shared/services/jwt/jwt.service';
import { PasswordService } from 'src/shared/services/password/password.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private authenticationDAO: AuthenticationDAO,
    private passwordService: PasswordService,
    private jwtService: JwtAuthService,
  ) {}

  async login(data: LoginInputDto, isAdmin?: boolean): Promise<LoginOutputDto> {
    const account = await this.authenticationDAO.getByCredential(
      data.credential,
      isAdmin,
    );

    if (!account) {
      throw new BadRequestException(ErrorMessages.INVALID_CREDENTIALS);
    }

    const isMatch = this.passwordService.compare(
      data.password,
      account.password,
    );
    if (!isMatch) {
      throw new BadRequestException(ErrorMessages.INVALID_CREDENTIALS);
    }

    return {
      id: account.id,
      accessToken: this.jwtService.generateToken(account),
    };
  }
}
