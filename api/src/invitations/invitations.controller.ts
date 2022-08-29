import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { ValidateMongoId } from 'src/common/pipe';
import {
  ErrorInvitationsDto,
  InvitationsDeleteDto,
  InvitationsDto,
  InvitationsResponseDto,
} from './dto';
import { InvitationsService } from './invitations.service';
import { Invitations } from './schema';

@Controller('api/invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @ApiOkResponse({
    description: '200',
    type: InvitationsResponseDto,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorInvitationsDto,
  })
  @UseGuards(AtGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  getInvitationsByUserId(
    @GetCurrentUserId() user_id: string,
  ): Promise<Invitations[]> {
    return this.invitationsService.getInvitationsByUserId(user_id);
  }

  @ApiOkResponse({
    description: '200',
    type: InvitationsResponseDto,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorInvitationsDto,
  })
  @UseGuards(AtGuard)
  @Get('/matches/:id')
  @HttpCode(HttpStatus.OK)
  getInvitationsByMatchId(
    @Param('id', ValidateMongoId) match_id: string,
  ): Promise<Invitations[]> {
    return this.invitationsService.getInvitationsByMatchId(match_id);
  }

  @ApiCreatedResponse({
    description: '201 Created',
    type: InvitationsResponseDto,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorInvitationsDto,
  })
  @UseGuards(AtGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() invitationsDto: InvitationsDto): Promise<Invitations> {
    return this.invitationsService.createInvitations(invitationsDto);
  }

  @ApiOkResponse({
    description: '200 OK',
    type: InvitationsResponseDto,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorInvitationsDto,
  })
  @UseGuards(AtGuard)
  @Patch('')
  @HttpCode(HttpStatus.OK)
  update(@Body() invitationsDto: InvitationsDto): Promise<Invitations> {
    return this.invitationsService.updateInvitations(invitationsDto);
  }

  @ApiAcceptedResponse({
    description: '200 Accepted',
    type: Number,
  })
  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorInvitationsDto,
  })
  @UseGuards(AtGuard)
  @Delete('')
  @HttpCode(HttpStatus.OK)
  delete(@Body() { user_id, match_id }: InvitationsDeleteDto): Promise<number> {
    return this.invitationsService.deleteInvitations(user_id, match_id);
  }
}
