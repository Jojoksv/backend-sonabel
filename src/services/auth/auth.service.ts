import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUser, UserPayload } from '../../types/types';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const limiter = new RateLimiterMemory({
  points: 5,
  duration: 10,
});

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ loginData }) {
    try {
      await limiter.consume(loginData.matricule);
    } catch {
      throw new UnauthorizedException(
        'Trop de tentatives de connexion. Veuillez réessayer plus tard.',
      );
    }

    const { matricule, password } = loginData;

    const existingUser = await this.prisma.user.findUnique({
      where: { matricule },
    });

    if (!existingUser) {
      throw new NotFoundException('Identifiants invalides');
    }

    const isPasswordSame = await this.isPasswordValid({
      password,
      hashPassword: existingUser.password,
    });

    if (!isPasswordSame) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return this.authenticateUser({
      userId: existingUser.id,
    });
  }

  async register({ registerData }: { registerData: CreateUser }) {
    const { matricule, name, password } = registerData;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        matricule: matricule,
      },
    });

    if (existingUser) {
      throw new ConflictException('Identifiants invalides');
    }

    const hashPassword = await this.hashPassword({ password });

    const createdUser = await this.prisma.user.create({
      data: {
        matricule,
        name,
        password: hashPassword,
      },
    });

    return this.authenticateUser({
      userId: createdUser.id,
    });
  }

  private async hashPassword({ password }: { password: string }) {
    return await hash(password, 10);
  }

  private isPasswordValid({
    password,
    hashPassword,
  }: {
    password: string;
    hashPassword: string;
  }) {
    return compare(password, hashPassword);
  }

  private authenticateUser({ userId }: UserPayload) {
    const payload: UserPayload = { userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
