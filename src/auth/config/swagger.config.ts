import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () =>
  new DocumentBuilder()
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
