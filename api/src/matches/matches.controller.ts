import { Matches } from './schema/matches.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { MatchesService } from './matches.service';
import { AtGuard } from 'src/common/guards';
import { ValidateMongoId } from 'src/common/pipe';
import { ErrorMatchesDto, MatchesDto, MatchesResponseDto } from './dto';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('api/matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @ApiOkResponse({
    description: '200',
    type: MatchesResponseDto,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorMatchesDto,
  })
  @UseGuards(AtGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getMatchById(@Param('id', ValidateMongoId) id: string): Promise<Matches> {
    return this.matchesService.getMatchById(id);
  }

  @ApiOkResponse({
    description: '200',
    type: [MatchesResponseDto],
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorMatchesDto,
  })
  @UseGuards(AtGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  getAllMatches(@GetCurrentUserId() user_id: string): Promise<Matches[]> {
    return this.matchesService.getMatchesByUserId(user_id);
  }

  @ApiCreatedResponse({
    description: '201 Created',
    type: MatchesResponseDto,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorMatchesDto,
  })
  @UseGuards(AtGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(
    @GetCurrentUserId() user_id: string,
    @Body() matchesDto: MatchesDto,
  ): Promise<Matches> {
    return this.matchesService.createMatch(matchesDto, user_id);
  }

  @ApiOkResponse({
    description: '200 OK',
    type: MatchesResponseDto,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorMatchesDto,
  })
  @UseGuards(AtGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ValidateMongoId) id: string,
    @Body() matchesDto: MatchesDto,
  ): Promise<Matches> {
    return this.matchesService.updateMatch(id, matchesDto);
  }

  @ApiAcceptedResponse({
    description: '200 Accepted',
    type: Number,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorMatchesDto,
  })
  @UseGuards(AtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ValidateMongoId) id: string): Promise<number> {
    return this.matchesService.deleteMatch(id);
  }
}
