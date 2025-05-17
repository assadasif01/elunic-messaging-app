import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/message.entity';

// Use localhost since we're running outside the Docker network
const dbHost = 'localhost';
console.log('Using database host:', dbHost);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbHost,
      port: parseInt(process.env.APP_DB_PORT || '3306', 10),
      username: process.env.APP_DB_USER || 'app',
      password: process.env.APP_DB_PASS || 'app',
      database: process.env.APP_DB_NAME || 'app',
      entities: [Message],
      synchronize: false, // We're using explicit migrations
      migrationsRun: true, // Run migrations on application start
      migrations: [__dirname + '/../migrations/**/*.{js,ts}'],
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
