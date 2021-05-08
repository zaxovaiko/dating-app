import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InformationModule } from './information/information.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), AuthModule, UserModule, InformationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
