import { Test, TestingModule } from '@nestjs/testing';
import { SpecialForcesService } from './special-forces.service';

describe('SpecialForcesService', () => {
  let service: SpecialForcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialForcesService],
    }).compile();

    service = module.get<SpecialForcesService>(SpecialForcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
