import { Test, TestingModule } from '@nestjs/testing';
import { UsersCheckinController } from './users-checkin.controller';

describe('UsersCheckinController', () => {
  let controller: UsersCheckinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersCheckinController],
    }).compile();

    controller = module.get<UsersCheckinController>(UsersCheckinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
