import { Test, TestingModule } from '@nestjs/testing';
import { UsersCheckinService } from './users-checkin.service';

describe('UsersCheckinService', () => {
  let service: UsersCheckinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCheckinService],
    }).compile();

    service = module.get<UsersCheckinService>(UsersCheckinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
