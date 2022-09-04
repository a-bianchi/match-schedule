import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

import { PingController } from './ping.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { InvitationsModule } from './invitations/invitations.module';
import { MailModule } from './mail/mail.module';
import { MatchesPublicModule } from './matches-public/matches-public.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      configService.get('MONGODB_URI') || `mongodb://localhost:27017/match`,
      {
        autoIndex: true,
      },
    ),
    UsersModule,
    AuthModule,
    MatchesModule,
    InvitationsModule,
    MailModule,
    MatchesPublicModule,
  ],
  controllers: [PingController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT') || 3000;
  }
}
