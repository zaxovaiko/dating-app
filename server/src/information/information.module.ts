import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Information, InformationSchema } from './schemas/information.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Information.name, schema: InformationSchema },
    ]),
    UserModule,
  ],
  controllers: [InformationController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    InformationService,
  ],
})
export class InformationModule {}
