import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { DbClientService } from '../../db-client/db-client.service';
import { ConfigService } from '@nestjs/config';

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsService, DbClientService, ConfigService],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
