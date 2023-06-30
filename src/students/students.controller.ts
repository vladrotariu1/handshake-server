import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  getStudents() {
    return this.studentsService.getStudents();
  }

  @Post()
  checkInStudent(@Body() createStudentDto: StudentDto) {
    return this.studentsService.checkIn(createStudentDto);
  }
}
