import { BadRequestException, Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { DbClientService } from '../../db-client/db-client.service';

@Injectable()
export class StudentsService {
  constructor(private dbClientService: DbClientService) {}

  getStudents() {
    return this.dbClientService.student.findMany({
      orderBy: [
        {
          checkInTime: 'desc',
        },
      ],
    });
  }

  async checkIn(student: StudentDto) {
    const findStudent = await this.findStudentByEmail(student.email);

    if (findStudent !== null) {
      return this.updateStudentCheckIn(
        findStudent,
        findStudent.checkInCount,
        findStudent.id,
      );
    } else {
      return this.createStudent(student);
    }
  }

  createStudent(student: StudentDto) {
    this.validateEmail(student.email);

    return this.dbClientService.student.create({
      data: {
        ...student,
        checkInCount: 1,
      },
    });
  }

  updateStudentCheckIn(student: StudentDto, checkInCount: number, id: string) {
    return this.dbClientService.student.update({
      where: {
        id: id,
      },
      data: {
        ...student,
        checkInCount: checkInCount + 1,
      },
    });
  }

  findStudentByEmail(email: string) {
    return this.dbClientService.student.findUnique({
      where: {
        email: email,
      },
    });
  }

  validateEmail(email: string) {
    const regex = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.edu');
    const isValid = regex.test(email);

    if (!isValid) throw new BadRequestException('E-mail should end with .edu');
  }
}
