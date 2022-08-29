import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { InvitationsDto } from './dto';
import { Invitations, InvitationsDocument } from './schema';

// import { UsersDocument } from './../users/schema';
// import { MatchesDocument } from './../matches/schema';

type InvitationsCreateResponse = Invitations;

@Injectable()
export class InvitationsService {
  constructor(
    @InjectModel(Invitations.name)
    private readonly invitationsModel: Model<InvitationsDocument>, // private readonly usersModel: Model<UsersDocument>, // private readonly matchesModel: Model<MatchesDocument>,
  ) {}

  async createInvitations(
    invitationsDto: InvitationsDto,
  ): Promise<InvitationsCreateResponse | null> {
    try {
      // TODO: check if user is already invited to match
      // const match = await this.matchesModel
      //   .findOne({ _id: invitationsDto.match_id })
      //   .exec();

      // if (!match) throw new InternalServerErrorException('Match not found');

      // const user = await this.usersModel
      //   .findOne({ _id: invitationsDto.user_id })
      //   .exec();

      // if (!user) throw new InternalServerErrorException('User not found');

      const existInvitation = await this.invitationsModel
        .findOne({
          user_id: invitationsDto.user_id,
          match_id: invitationsDto.match_id,
        })
        .exec();

      if (existInvitation)
        throw new InternalServerErrorException('Invitation already exists');

      const invitation = await this.invitationsModel.create({
        ...invitationsDto,
        password: Math.random().toString(36).substring(2, 8),
      });

      return invitation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateInvitations(
    invitationsDto: InvitationsDto,
  ): Promise<InvitationsCreateResponse | null> {
    try {
      const { user_id, match_id } = invitationsDto;
      const invitation = await this.invitationsModel
        .updateOne({ user_id, match_id }, invitationsDto)
        .exec();

      return invitation.modifiedCount === 0 ? null : invitationsDto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteInvitations(user_id: string, match_id: string): Promise<number> {
    try {
      const invitation = await this.invitationsModel
        .deleteOne({ user_id, match_id })
        .exec();

      return invitation.deletedCount;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInvitationsByUserId(user_id: string): Promise<Invitations[]> {
    try {
      return await this.invitationsModel.find({ user_id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInvitationsByMatchId(match_id: string): Promise<Invitations[]> {
    try {
      return await this.invitationsModel.find({ match_id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
