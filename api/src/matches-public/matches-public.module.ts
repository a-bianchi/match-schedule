import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesPublicController } from './matches-public.controller';
import { MatchesPublicService } from './matches-public.service';
import { Matches, MatchesSchema } from '../matches/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Matches.name, schema: MatchesSchema }]),
  ],
  controllers: [MatchesPublicController],
  providers: [MatchesPublicService],
})
export class MatchesPublicModule {}
