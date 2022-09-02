import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  AuthDto,
  ErrorRefreshAuthDto,
  ErrorSignAuthDto,
  ErrorSignUpAuthDto,
  TokenDtoResponse,
} from './dto';
import { AtGuard, RtGuard } from '../common/guards';
import { GetCurrentUserId, GetCurrentUser, Public } from '../common/decorators';
import { InvitationsResponseDto } from 'src/invitations/dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: '201 Created',
    type: TokenDtoResponse,
  })
  @ApiConflictResponse({
    description: '409 Conflict',
    type: ErrorSignUpAuthDto,
  })
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<TokenDtoResponse> {
    return this.authService.signupLocal(dto);
  }

  @ApiForbiddenResponse({
    description: '403 Forbidden',
    type: ErrorSignAuthDto,
  })
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<TokenDtoResponse> {
    return this.authService.signinLocal(dto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @ApiUnauthorizedResponse({
    description: '403 Forbidden',
    type: ErrorRefreshAuthDto,
  })
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TokenDtoResponse> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiOkResponse({
    description: '200',
    type: Boolean,
  })
  @Public()
  @Get('local/verify/:userId/:confirmPassword')
  @HttpCode(HttpStatus.OK)
  verify(
    @Param('userId') userId: string,
    @Param('confirmPassword') confirmPassword: string,
  ): Promise<boolean> {
    return this.authService.verify(userId, confirmPassword);
  }
}
