import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  attachSwaggerUI(app);
  await app.listen(3333);
}

function attachSwaggerUI(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('test-fullstack')
    .setDescription('Тестовый проект - RESTful сервис "блог".')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
}

bootstrap();
