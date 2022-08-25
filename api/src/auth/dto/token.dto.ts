import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenDtoResponse {
  @ApiProperty({
    type: String,
    description: 'access_token',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMjczOWY3Yy0yNGExLTQ4NzYtOWU1NC1mZmNmMTUwMTIzODEiLCJlbWFpbCI6ImpzaW1vbkBza3lkcm9weC5jb20uYXIiLCJpYXQiOjE2NDc2MDUwNDMsImV4cCI6MTY0NzYwNTk0M30.7vdRvOBI-dpoaWCmd8v0qW5uePk-T7VqU4DQn_5Eihs',
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    type: String,
    description: 'refresh_token',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMjczOWY3Yy0yNGExLTQ4NzYtOWU1NC1mZmNmMTUwMTIzODEiLCJlbWFpbCI6ImpzaW1vbkBza3lkcm9weC5jb20uYXIiLCJpYXQiOjE2NDc2MDUwNDMsImV4cCI6MTY0ODIwOTg0M30.R0VdZcb_ag9goTd-1KliT7m01WJWpZDMnyGpq3q1O2A',
  })
  @IsString()
  refresh_token: string;
}
