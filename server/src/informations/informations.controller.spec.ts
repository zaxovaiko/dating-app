import { Test, TestingModule } from '@nestjs/testing';
import { InformationsController } from './informations.controller';
import { InformationsService } from './informations.service';

describe('InformationController', () => {
  let controller: InformationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationsController],
      providers: [InformationsService],
    }).compile();

    controller = module.get<InformationsController>(InformationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
