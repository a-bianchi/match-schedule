import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  max_substitutes: number;
}
