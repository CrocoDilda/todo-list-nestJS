import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  //Ставлю глобально пайпы для валидации входящих данных
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('ToDo list API')
    .setDescription('API documentation for ToDo list project')
    .setVersion('1.0.0')
    .setContact(
      'CrocoDilda',
      'https://github.com/CrocoDilda/todo-list-nestJS',
      'cucuprum4k@gmail.com',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'ToDo list docs',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
