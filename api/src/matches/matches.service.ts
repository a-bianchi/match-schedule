import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Matches, MatchesDocument } from './schema';

type MatchesCreateResponse = Matches;

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Matches.name)
    private readonly matchesModel: Model<MatchesDocument>,
  ) {}

  async createMatch(
    email: string,
    password: string,
  ): Promise<MatchesCreateResponse | null> {
    try {
      const newMatch = await this.matchesModel.create({
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
}
function uuid() {
  throw new Error('Function not implemented.');
}
