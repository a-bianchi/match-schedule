import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitations, InvitationsSchema } from './schema';
// import { Users, UsersSchema } from 'src/users/schema';
// import { Matches, MatchesSchema } from 'src/matches/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invitations.name, schema: InvitationsSchema },
      // { name: Users.name, schema: UsersSchema },
      // { name: Matches.name, schema: MatchesSchema },
    ]),
  ],
  providers: [InvitationsService],
  controllers: [InvitationsController],
})
export class InvitationsModule {}
