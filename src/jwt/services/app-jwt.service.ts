import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppJwtServicePort } from '@src/jwt/services/app-jwt.service-port';

@Injectable()
export class AppJwtService implements AppJwtServicePort {
  constructor(private readonly jwtService: JwtService) {}
  sign(): any {}

  verify(): any {}
}
