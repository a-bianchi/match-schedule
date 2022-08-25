import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Match App - API Documentation')
  .setDescription('Match - Match App - API Solution.')
  .setVersion('1.0')
  .addTag('API Endpoints')
  .build();
