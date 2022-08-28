import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MatchesDto } from './dto';
import { Matches, MatchesDocument } from './schema';

type MatchesCreateResponse = Matches;

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Matches.name)
    private readonly matchesModel: Model<MatchesDocument>,
  ) {}

  async createMatch(
    userId: string,
    matchesDto: MatchesDto,
  ): Promise<MatchesCreateResponse | null> {
    try {
      const match = {
        ...matchesDto,
        admin_user_id: userId,
        password: Math.random().toString(36).substring(2, 8),
      };

      const newMatch = await this.matchesModel.create(match);

      return newMatch;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMatch(
    _id: string,
    matchesDto: MatchesDto,
  ): Promise<MatchesCreateResponse | null> {
    try {
      await this.matchesModel.findByIdAndUpdate(_id, matchesDto).exec();

      const match = await this.matchesModel.findById(_id).exec();

      return match;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMatch(id: string): Promise<number> {
    try {
      const match = await this.matchesModel.deleteOne({ _id: id }).exec();

      return match.deletedCount;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMatchById(id: string): Promise<Matches> {
    try {
      return await this.matchesModel.findById({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMatchByUserId(userId: string): Promise<Matches> {
    try {
      return await this.matchesModel.findById({ userId }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
