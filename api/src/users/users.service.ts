import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bycryptjs from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schema';
import { Tokens } from 'src/auth/types';

import { InjectModel } from '@nestjs/mongoose';

interface UserCreateResponse extends Users, Tokens {}

@Injectable()
export class UsersService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async createUser(
    email: string,
    password: string,
  ): Promise<UserCreateResponse | null> {
    try {
      const user = await this.getUserByEmail(email);

      if (user) return null;

      const userId = uuid();
      const hash = await bycryptjs.hash(password, 10);
      const tokens = await this.getTokens(userId, email);
      const hashrt = await bycryptjs.hash(tokens.refresh_token, 10);

      const newUser = await this.usersModel.create({
        user_id: userId,
        email,
        hash,
        hashrt,
        created_at: new Date().toISOString(),
      });

      return {
        ...tokens,
        ...newUser,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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

  async updateRtUser(userId: string, refresh_token?: string): Promise<void> {
    try {
      const hashrt = refresh_token
        ? await bycryptjs.hash(refresh_token, 10)
        : null;

      await this.usersModel
        .findOneAndUpdate({ user_id: userId }, { hashrt })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserByEmail(email: string): Promise<Users | undefined> {
    const queryUser = this.usersModel.findOne<Users>({ email }).exec();
    return await queryUser;
  }

  async getUserById(userId: string): Promise<Users | undefined> {
    const queryUser = this.usersModel.findOne<Users>({ _id: userId }).exec();
    return await queryUser;
  }
}
