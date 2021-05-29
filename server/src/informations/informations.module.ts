import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { InformationsController } from './informations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Information, InformationSchema } from './schemas/informations.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Information.name, schema: InformationSchema },
    ]),
  ],
  controllers: [InformationsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    InformationsService,
  ],
  exports: [InformationsService],
})
export class InformationsModule {}
