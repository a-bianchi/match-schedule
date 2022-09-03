import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { MatchesPublicService } from './matches-public.service';
import { ValidateMongoId } from 'src/common/pipe';
import { MatchesPublicDto, MatchesPublicResponseDto } from './dto';
import { Public } from 'src/common/decorators';
import { MatchesDto } from 'src/matches/dto';
import { Matches } from 'src/matches/schema';

@Controller('api/matches-public')
export class MatchesPublicController {
  constructor(private matchesPublicService: MatchesPublicService) {}

  @ApiOkResponse({
    description: '200',
    type: MatchesPublicResponseDto,
  })
  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getMatchById(@Param('id', ValidateMongoId) id: string): Promise<Matches> {
    return this.matchesPublicService.getMatchById(id);
  }

  @ApiCreatedResponse({
    description: '201 Created',
    type: MatchesPublicResponseDto,
  })
  @Public()
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() matchesDto: MatchesDto): Promise<Matches> {
    return this.matchesPublicService.createMatchPublic(matchesDto);
  }

  @ApiOkResponse({
    description: '200 OK',
    type: MatchesPublicResponseDto,
  })
  @Public()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ValidateMongoId) id: string,
    @Body() matchesPublicDto: MatchesPublicDto,
  ): Promise<Matches> {
    return this.matchesPublicService.updateMatchPublic(id, matchesPublicDto);
  }
}
