import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsMongoId,
  IsDate,
  IsArray,
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
  maxHeadlines: number;

  @ApiProperty({
    type: Object,
    description: 'Headlines players',
    default: [
      {
        name: 'John Doe',
        phone: 3001234567,
        attend: false,
      },
      {
        name: 'Jane Doe',
        phone: 3001234567,
        attend: true,
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  headlines: PlayersDto[];

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
  user_id: string;

  @ApiProperty({
    type: Object,
    description: 'Headlines players',
    default: [
      {
        name: 'John Doe',
        phone: 3001234567,
        attend: true,
      },
      {
        name: 'John Doe',
        phone: 3001234567,
        attend: true,
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  headlines: PlayersDto[];

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
    type: Boolean,
    description: 'User attended',
    default: 'false',
  })
  @IsOptional()
  @IsBoolean()
  attend?: boolean;

  @ApiProperty({
    type: String,
    description: 'Name of the player',
    default: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Phone of the player',
    default: 3001234567,
  })
  @IsOptional()
  @IsNumber()
  phone?: number;
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
