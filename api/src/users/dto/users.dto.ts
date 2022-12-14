import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: 'User id',
  })
  readonly user_id: string;

  @ApiProperty({
    example: 'User valid email',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Token jwt',
  })
  readonly hash: string;

  @ApiProperty({
    example: 'Refresh Token jwt',
  })
  readonly hashrt: string;

  @ApiProperty({
    example: 'Is user active',
  })
  readonly isActive: boolean;

  @ApiProperty({
    example: 'Confirm password',
  })
  readonly confirm_password: string;

  @ApiProperty({
    example: 'Available matches for user',
  })
  readonly available_matches: number;

  @ApiProperty({
    example: 'User created at',
  })
  readonly created_at: Date;
}
