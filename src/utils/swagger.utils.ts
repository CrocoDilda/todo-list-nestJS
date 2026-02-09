import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from 'src/auth/config/swagger.config';

export const setupSwagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, getSwaggerConfig());

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'ToDo list docs',
  });
};
