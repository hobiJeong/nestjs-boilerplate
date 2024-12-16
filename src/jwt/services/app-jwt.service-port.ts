import { JwtPayload } from '@src/jwt/types/app-jwt.interface';

export interface AppJwtServicePort {
  generateAccessToken(payload: JwtPayload): string;
  verifyAccessToken(accessToken: string): JwtPayload;
}
