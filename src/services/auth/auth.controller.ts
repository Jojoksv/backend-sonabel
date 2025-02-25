import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt.auth.guard';
import { CreateUser } from 'src/types/types';
import { UserService } from '../user/user.service';
import { RateLimit } from 'nestjs-rate-limiter';
import { LoginDto } from '../../dtos/loginDTO';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  logger = new Logger('AuthController');

  @Post('login')
  async login(@Body() loginData: LoginDto, @Res() res: any) {
    try {
      this.logger.log(
        `Tentative de connexion pour l'utilisateur ${loginData.matricule}`,
      );
      const { access_token } = await this.authService.login({ loginData });

      return res.send({ message: 'Connexion réussie !', token: access_token });
    } catch (error) {
      this.logger.error('Erreur lors de la connexion', error);
      throw new UnauthorizedException(
        'Échec de connexion. Vérifiez vos identifiants.',
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @RateLimit({ points: 5, duration: 10 })
  async register(
    @Body() registerData: CreateUser,
    @Res({ passthrough: true }) res: any,
  ) {
    const { access_token } = await this.authService.register({ registerData });

    return res.send({ message: 'Inscription réussie !', token: access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAuthenticatedUser(@Req() request: any) {
    console.log('Utilisateur authentifié:', request.user);
    return await this.userService.getUser({
      userId: request.user.userId,
    });
  }
}
