import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './services/user/user.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { HelloModule } from './services/hello/hello.module';
import { MissionsModule } from './missions/missions.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    HelloModule,
    AuthModule,
    UserModule,
    RateLimiterModule.register({
      points: 5,
      duration: 10,
      blockDuration: 60 * 15,
    }),
    MissionsModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
