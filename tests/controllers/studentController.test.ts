import app from "..";
import supertest from "supertest";
import { Student } from "src/entities/Student";

jest.mock("../../src/db/students", () => {
  const originalModules = jest.requireActual("../../src/db/students");

  const students: Student[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999"),
    },
  ];

  return {
    __esModule: true,
    ...originalModules,
    getStudents: () => Promise.resolve(students),
    updateStudent: (studentUpdate: Partial<Student>) => {
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
    },
    addStudent: (student: Student) => {
      const studentToAdd = {
        ...student,
        id: students.length ? students[students.length - 1].id! + 1 : 1,
      };
      students.push(Object.freeze(studentToAdd));
      return Promise.resolve(studentToAdd);
    },
    deleteStudent: (studentId: number) => {
      const studentToDelete = students.find(
        (student) => student.id === studentId
      );

      if (!studentToDelete) {
        return Promise.resolve(undefined);
      }

      const studentIndex = students.indexOf(studentToDelete);

      students.splice(studentIndex, 1);
      return Promise.resolve(studentToDelete);
    },
  };
});

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });

  it("should update a student", async () => {
    const updates = {
      id: 2,
      name: "Tulhao",
    };

    await supertest(app)
      .put("/students")
      .send(updates)
      .expect(200)
      .then((res) => expect(res.body["name"]).toMatch("Tulhao"));
  });

  it("should delete a student", async () => {
    await supertest(app)
      .delete("/students/2")
      .send()
      .expect(200)
      .then((res) => expect(res.body["id"]).toEqual(2));

    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });
});
