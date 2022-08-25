import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    description: 'email',
    default: 'alejobianchi@gmail.com.ar',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'password', default: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ErrorSignUpAuthDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'statusCode', default: 409 })
  readonly statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'message',
    default: 'email already exists',
  })
  readonly message: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'error',
    default: 'Conflict',
  })
  readonly error: string;
}

export class ErrorSignAuthDto {
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

export class ErrorRefreshAuthDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'statusCode', default: 401 })
  readonly statusCode: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'message',
    default: 'Unauthorized',
  })
  readonly message: string;
}
