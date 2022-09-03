import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsDate,
} from 'class-validator';
import { MatchesDto } from 'src/matches/dto';

export class MatchesPublicDto extends MatchesDto {
  @ApiProperty({
    type: String,
    description: 'Security code',
    default: '1234',
  })
  @IsNotEmpty()
  @IsString()
  security_code: string;
}

export class MatchesPublicResponseDto extends MatchesDto {
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
    description: 'Security code',
    default: '1234',
  })
  @IsNotEmpty()
  @IsString()
  security_code: string;

  @ApiProperty({
    type: Date,
    description: 'Created at',
    default: '1661661670915',
  })
  @IsOptional()
  @IsDate()
  created_at: Date;

  @ApiProperty({
    type: Date,
    description: 'Update at',
    default: '1661661670915',
  })
  @IsOptional()
  @IsDate()
  update_at: Date;
}
