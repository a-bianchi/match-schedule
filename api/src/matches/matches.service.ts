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
    matchesDto: MatchesDto,
    user_id?: string,
  ): Promise<MatchesCreateResponse | null> {
    try {
      if (matchesDto.headlines.length > matchesDto.maxHeadlines)
        throw new InternalServerErrorException('Too many headlines');

      const newMatch = await this.matchesModel.create({
        ...matchesDto,
        user_id,
      });

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

  async getMatchById(_id: string): Promise<Matches> {
    try {
      return await this.matchesModel.findById({ _id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMatchesByUserId(user_id: string): Promise<Matches[]> {
    try {
      return await this.matchesModel.find({ user_id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
