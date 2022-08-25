import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bycryptjs from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';
import { Tokens } from 'src/auth/types';
import { Events } from '@skydropx/dml-dynamodb/dist/types';

interface UserCreateResponse extends User, Tokens {}

@Injectable()
export class UsersService {
  private dbDataInsert: DbDataInsert;

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @InjectKnex() private readonly knex: Knex,
  ) {
    this.dbDataInsert = new DbDataInsert(
      this.config.get<string>('EVENT_STORE_NAME') || '',
      this.config.get<string>('AWS_REGION') || 'us-east-1',
    );
  }

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

      const newUserEvent = await this.dbDataInsert.insert({
        aggregateId: userId,
        email,
        hash,
        hashrt,
        eventType: Events.UserRegistered,
      });

      const newUser: User = {
        id: newUserEvent?.Item?.aggregateId,
        sequence: newUserEvent?.Item?.sequence,
        email,
        hash,
        hashrt,
        createdat: newUserEvent?.Item?.createdAt,
        updatedat: newUserEvent?.Item?.createdAt,
      };

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

      await this.dbDataInsert.insert({
        aggregateId: userId,
        hashrt,
        eventType: Events.UserRtUpdated,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const queryUser = this.knex
      .select<User>('*')
      .from('users')
      .where({ email })
      .first();

    return await queryUser;
  }

  async getUserById(userId: string): Promise<User | undefined> {
    const queryUser = this.knex
      .select<User>('*')
      .from('users')
      .where({ id: userId })
      .first();

    return await queryUser;
  }
}
