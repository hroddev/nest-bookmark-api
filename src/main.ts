import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'

  app.setGlobalPrefix(globalPrefix)

  // swagger config
  const options = new DocumentBuilder()
    .setTitle('Bookmarks CRUD')
    .setDescription('The bookmarks API with test e2e')
    .setVersion('1.0')
    .addTag('bookmarks')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  
  SwaggerModule.setup('docs', app, document)

  // Enable CORS
  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  await app.listen(5000)
}
bootstrap()
