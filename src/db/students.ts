import { Student } from "../types/Student";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

/**
 * Update a student from the list
 * @param studentUpdate Student updates
 * @returns updated student
 */
function updateStudent(studentUpdate: Partial<Student>) {
  const studentToUpdate = students.find(
    (student) => student.id === studentUpdate.id
  );

  if (!studentToUpdate) {
    return Promise.resolve(undefined);
  }

  const updatedStudent: Student = Object.assign(
    {},
    studentToUpdate,
    studentUpdate
  );

  const studentIndex = students.indexOf(studentToUpdate);
  students[studentIndex] = Object.freeze(updatedStudent);
  return Promise.resolve(updatedStudent);
}

/**
 * Delete a student from the list
 * @param studentId deleted student ID
 * @returns deleted student
 */
function deleteStudent(studentId: Number) {
  const studentToDelete = students.find((student) => student.id === studentId);

  if (!studentToDelete) {
    return Promise.resolve(undefined);
  }

  const studentIndex = students.indexOf(studentToDelete);

  students.splice(studentIndex, 1);
  return Promise.resolve(studentToDelete);
}

export { addStudent, getStudents, updateStudent, deleteStudent };
