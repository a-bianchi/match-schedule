import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsObject,
  IsMongoId,
  IsDate,
} from 'class-validator';

export class MatchesDto {
  @ApiProperty({
    type: String,
    description: 'Name of the match',
    default: 'Global Cup',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Match time', default: '15:00hs' })
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty({
    type: String,
    description: 'Match address',
    default: 'Av. Amazonas, Nro. 5, Bogotá',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    type: Number,
    description: 'Headlines limit',
    default: '10',
  })
  @IsNotEmpty()
  @IsNumber()
  max_headlines: number;

  @ApiProperty({
    type: Number,
    description: 'Substitutes limit',
    default: '0',
  })
  @IsOptional()
  @IsNumber()
  max_substitutes: number;

  @ApiProperty({
    type: Object,
    description: 'Headlines players',
    default: [
      {
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
        attend: true,
      },
      {
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
        attend: true,
      },
    ],
  })
  @IsNotEmpty()
  @IsObject()
  headlines: PlayersDto[];

  @ApiProperty({
    type: Object,
    description: 'Substitutes players',
    default: [
      {
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
        attend: true,
      },
    ],
  })
  @IsOptional()
  @IsObject()
  substitutes: PlayersDto[];

  @ApiProperty({
    type: String,
    description: 'Match note',
    default: 'All the best',
  })
  @IsOptional()
  @IsString()
  note: string;
}

export class MatchesResponseDto extends MatchesDto {
  @ApiProperty({
    type: String,
    description: 'Id of the match',
    default: '630aeeb06997b40d6907c6c0',
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty({
    type: String,
    description: 'The id of admin user',
    default: 'f05191fd-6aca-4b7d-a250-a22360ea297f',
  })
  @IsNotEmpty()
  @IsMongoId()
  admin_user_id: string;

  @ApiProperty({
    type: Object,
    description: 'Headlines players',
    default: [
      {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
        attend: true,
      },
      {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
        attend: true,
      },
    ],
  })
  @IsNotEmpty()
  @IsObject()
  headlines: PlayersResponseDto[];

  @ApiProperty({
    type: Object,
    description: 'Substitutes players',
    default: [
      {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        user_id: '5e9f8f8f8f8f8f8f8f8f8f8',
        attend: true,
      },
    ],
  })
  @IsOptional()
  @IsObject()
  substitutes: PlayersResponseDto[];

  @ApiProperty({
    type: Date,
    description: 'Created at',
    default: '1661661670915',
  })
  @IsOptional()
  @IsDate()
  created_at: Date;
}
export class PlayersDto {
  @ApiProperty({
    type: String,
    description: 'User id',
    default: '5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f',
  })
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @ApiProperty({
    type: Boolean,
    description: 'User attended',
    default: 'false',
  })
  @IsOptional()
  @IsBoolean()
  attend: boolean;
}

export class PlayersResponseDto {
  @ApiProperty({
    type: String,
    description: 'id',
    default: '5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f',
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty({
    type: String,
    description: 'User id',
    default: '5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f',
  })
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @ApiProperty({
    type: Boolean,
    description: 'User attended',
    default: 'false',
  })
  @IsOptional()
  @IsBoolean()
  attend: boolean;

  @ApiProperty({
    type: Date,
    description: 'Created at',
    default: '1661661670915',
  })
  @IsOptional()
  @IsDate()
  created_at: Date;
}
export class ErrorMatchesDto {
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
