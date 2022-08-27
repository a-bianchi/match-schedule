import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bycryptjs from 'bcryptjs';

import { AuthDto } from './dto';
import { Tokens } from './types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signupLocal({ email, password }: AuthDto): Promise<Tokens> {
    const newUserDb = await this.userService.createUser(email, password);

    if (!newUserDb) throw new ConflictException('email already exists');

    return {
      access_token: newUserDb.access_token,
      refresh_token: newUserDb.refresh_token,
    };
  }

  async signinLocal({ email, password }: AuthDto): Promise<Tokens> {
    const userDb = await this.userService.getUserByEmail(email);
    if (!userDb) throw new ForbiddenException('Access Denied');

    const passswordMatches = await bycryptjs.compare(password, userDb.hash);
    if (!passswordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(userDb.user_id, userDb.email);

    await this.userService.updateRtUser(userDb.user_id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new ForbiddenException('Access Denied');

    await this.userService.updateRtUser(user.user_id);

    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const userDb = await this.userService.getUserById(userId);

    if (!userDb || !userDb.hashrt)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bycryptjs.compare(rt, userDb.hashrt);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(userDb.user_id, userDb.email);
    await this.userService.updateRtUser(userDb.user_id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload = {
      sub: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
