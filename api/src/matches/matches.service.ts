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
      matchesDto.name = matchesDto.name.toLocaleLowerCase();

      // TODO: for relation invite password: Math.random().toString(36).substring(2, 8),

      const queryMatch = await this.matchesModel
        .findOne({ name: matchesDto.name })
        .exec();

      if (queryMatch)
        throw new InternalServerErrorException('Match already exists');

      if (matchesDto.headlines.length > matchesDto.max_headlines)
        throw new InternalServerErrorException('Too many headlines');

      if (matchesDto.substitutes.length > matchesDto.max_substitutes)
        throw new InternalServerErrorException('Too many substitutes');

      const newMatch = await this.matchesModel.create({
        ...matchesDto,
        admin_user_id: userId,
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

  async getMatchById(id: string): Promise<Matches> {
    try {
      return await this.matchesModel.findById({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMatchesByUserId(userId: string): Promise<Matches[]> {
    try {
      return await this.matchesModel.find({ admin_user_id: userId }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
