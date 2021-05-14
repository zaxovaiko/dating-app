import { Test, TestingModule } from '@nestjs/testing';
import { InformationsService } from './informations.service';

describe('InformationService', () => {
  let service: InformationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformationsService],
    }).compile();

    service = module.get<InformationsService>(InformationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
