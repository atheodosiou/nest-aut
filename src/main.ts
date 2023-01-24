import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port=configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.info(`App is running on port ${port}`);
}
bootstrap();
