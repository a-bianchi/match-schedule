import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Matches, MatchesDocument } from '../matches/schema';
import { getRandomPassword } from 'src/utils';
import { MatchesDto } from 'src/matches/dto';
import { MatchesPublicDto, MatchesPublicResponseDto } from './dto';

type MatchesPublicCreateResponse = Matches;

@Injectable()
export class MatchesPublicService {
  constructor(
    @InjectModel(Matches.name)
    private readonly matchesModel: Model<MatchesDocument>,
  ) {}

  async createMatchPublic(
    matchesDto: MatchesDto,
  ): Promise<MatchesPublicCreateResponse | null> {
    try {
      if (matchesDto.headlines.length > matchesDto.maxHeadlines)
        throw new InternalServerErrorException('Too many headlines');

      const newMatchPublic = await this.matchesModel.create({
        ...matchesDto,
        security_code: getRandomPassword(),
      });

      return newMatchPublic;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMatchPublic(
    _id: string,
    matchesPublicDto: MatchesPublicDto,
  ): Promise<MatchesPublicCreateResponse | null> {
    try {
      const { security_code } = matchesPublicDto;

      const existMatch = await this.matchesModel
        .find({ _id, security_code })
        .exec();

      if (existMatch.length === 0)
        throw new InternalServerErrorException('Security code not found');

      delete matchesPublicDto.security_code;
      await this.matchesModel.findByIdAndUpdate(_id, matchesPublicDto).exec();

      const match = await this.matchesModel.findById(_id).exec();

      return match;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMatchById(_id: string): Promise<MatchesPublicResponseDto> {
    try {
      const match = await this.matchesModel.findById({ _id }).exec();
      delete match.security_code;
      return match;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
