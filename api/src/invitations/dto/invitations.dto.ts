import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsMongoId,
  IsDate,
} from 'class-validator';

export class InvitationsDto {
  @ApiProperty({
    type: String,
    description: 'User id',
    default: '630ade6c3e291c63fd8f5e32',
  })
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @ApiProperty({
    type: String,
    description: 'Match id',
    default: '630ade6c3e291c63fd8f5e32',
  })
  @IsNotEmpty()
  @IsMongoId()
  match_id: string;

  @ApiProperty({
    type: Boolean,
    description: 'Accepted',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  accepted: boolean;

  @ApiProperty({
    type: String,
    description: 'Password',
    default: '1234567',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Short url',
    default: 'http://localhost:3000/invitations/',
  })
  @IsOptional()
  @IsString()
  short_url: string;
}

export class InvitationsResponseDto extends InvitationsDto {
  @ApiProperty({
    type: String,
    description: 'Invitation id',
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty({
    type: Date,
    description: 'Created at',
    default: new Date(),
  })
  @IsOptional()
  @IsDate()
  created_at: Date;

  @ApiProperty({
    type: Date,
    description: 'Updated at',
    default: new Date(),
  })
  @IsOptional()
  @IsDate()
  updated_at: Date;
}

export class InvitationsDeleteDto {
  @ApiProperty({
    type: String,
    description: 'User id',
    default: '630ade6c3e291c63fd8f5e32',
  })
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @ApiProperty({
    type: String,
    description: 'Match id',
    default: '630ade6c3e291c63fd8f5e32',
  })
  @IsNotEmpty()
  @IsMongoId()
  match_id: string;
}

export class ErrorInvitationsDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'statusCode', default: 403 })
  readonly statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'message',
    default: 'Access Denied',
  })
  readonly message: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'error',
    default: 'Forbidden',
  })
  readonly error: string;
}
