import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsConfig } from './cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = process.env.NODE_ENV ?? 'development';
  const key = env === 'prod' ? 'production' : 'local';

  console.log(key);

  app.enableCors(CorsConfig[key]);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
