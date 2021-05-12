import { Module } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { InformationsController } from './informations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Information, InformationSchema } from './schemas/informations.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Information.name, schema: InformationSchema },
    ]),
    UsersModule,
  ],
  controllers: [InformationsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    InformationsService,
  ],
})
export class InformationsModule {}
