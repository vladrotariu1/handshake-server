import { Controller, Get } from '@nestjs/common';

@Controller('students')
export class StudentsController {
  @Get()
  getStudents(): string {
    return 'Get all the students';
  }
}
