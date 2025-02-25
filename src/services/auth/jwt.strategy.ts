import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from 'src/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log('🔹 Vérification du token dans la requête...');
          if (!req) {
            console.log('❌ Requête non définie.');
            return null;
          }

          // Vérifier dans l'Authorization header
          if (req.headers.authorization) {
            console.log('🔹 Header Authorization trouvé:', req.headers.authorization);
            if (req.headers.authorization.startsWith('Bearer ')) {
              const token = req.headers.authorization.split(' ')[1];
              console.log('✅ Token extrait depuis Authorization:', token);
              return token;
            } else {
              console.log('❌ Format de Authorization invalide.');
            }
          } else {
            console.log('❌ Aucun header Authorization.');
          }

          // Vérifier dans les cookies
          if (req.cookies) {
            console.log('🔹 Cookies trouvés:', req.cookies);
            if (req.cookies['access_token']) {
              console.log('✅ Token extrait depuis les cookies:', req.cookies['access_token']);
              return req.cookies['access_token'];
            } else {
              console.log('❌ Aucun access_token dans les cookies.');
            }
          } else {
            console.log('❌ Aucun cookie trouvé.');
          }

          console.log('❌ Aucun token trouvé dans la requête.');
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload) {
    console.log('🔹 Payload reçu dans JwtStrategy:', payload);
    if (!payload.userId) {
      console.log('❌ Payload invalide, userId manquant.');
      throw new UnauthorizedException('Invalid token payload');
    }
    console.log('✅ Payload validé avec userId:', payload.userId);
    return { userId: payload.userId };
  }
}
