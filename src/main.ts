import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './Middleware';
import { DataBaseExceptionFilter } from './common/exceptions/database/mysql/database.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(logger);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalFilters(new DataBaseExceptionFilter());

  await app.listen(8000);
}
bootstrap();
