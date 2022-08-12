import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { eventsModule } from './events/events.module';
import {userModule} from "./user/user.module"


@Module({
  imports: [ eventsModule,userModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal : true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
