import { getConnection } from "typeorm";
import { Student } from "../entities/Student";

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
async function addStudent(student: Student) {
  const newStudent = new Student(student);

  const connection = getConnection().getRepository(Student);
  await connection.save(newStudent);

  return newStudent;
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => getConnection().getRepository(Student).find();

/**
 * Update a student from the list
 * @param studentUpdate Student updates
 * @returns updated student
 */
async function updateStudent(studentUpdate: Partial<Student>) {
  let studentToUpdate = await getConnection()
    .getRepository(Student)
    .createQueryBuilder("student")
    .where("student.id = :id", { id: studentUpdate.id })
    .getOne();

  if (!studentToUpdate) {
    return Promise.resolve(undefined);
  }

  await getConnection()
    .createQueryBuilder()
    .update(Student)
    .set(studentUpdate)
    .where("student.id = :id", { id: studentUpdate.id })
    .execute();

  studentToUpdate = await getConnection()
    .getRepository(Student)
    .createQueryBuilder("student")
    .where("student.id = :id", { id: studentUpdate.id })
    .getOne();

  return Promise.resolve(studentUpdate);
}

/**
 * Delete a student from the list
 * @param studentId deleted student ID
 * @returns deleted student
 */
async function deleteStudent(studentId: Number) {
  const studentToDelete = await getConnection()
    .getRepository(Student)
    .createQueryBuilder("student")
    .where("student.id = :id", { id: studentId })
    .getOne();

  if (!studentToDelete) {
    return Promise.resolve(undefined);
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Student)
    .where("id = :id", { id: studentId })
    .execute();

  return studentToDelete;
}

export { addStudent, getStudents, updateStudent, deleteStudent };
