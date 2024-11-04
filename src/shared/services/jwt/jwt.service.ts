import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from 'src/modules/authentication/dtos/login.dto';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  public generateToken(data: any): string {
    const payload: PayloadDto = {
      id: data.id,
      role: data.role,
      name: data.name,
      profilePicture: data.profilePicture,
    };

    return this.jwtService.sign(payload, {
      privateKey: process.env.JWT_SECRET,
    });
  }
}
