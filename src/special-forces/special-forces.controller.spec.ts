import { Test, TestingModule } from '@nestjs/testing';
import { SpecialForcesController } from './special-forces.controller';

describe('SpecialForcesController', () => {
  let controller: SpecialForcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialForcesController],
    }).compile();

    controller = module.get<SpecialForcesController>(SpecialForcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
