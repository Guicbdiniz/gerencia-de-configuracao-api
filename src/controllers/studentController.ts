import * as StudentsDB from "../db/students";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response) {
    const updatedStudent = await StudentsDB.updateStudent(req.body);

    return res.status(StatusCodes.OK).json(updatedStudent);
  }

  async delete(req: Request, res: Response) {
    const studentId = parseInt(req.params["studentId"]);

    if (studentId === NaN) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid student ID");
    }

    const deletedStudent = await StudentsDB.deleteStudent(studentId);

    return res.status(StatusCodes.OK).json(deletedStudent);
  }
}
