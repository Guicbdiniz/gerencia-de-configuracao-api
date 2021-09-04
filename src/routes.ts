import { celebrate, Joi } from "celebrate";
import express, { response } from "express";
import { StudentsController } from "./controllers/studentController";
import { StudentPartialSchema, StudentSchema } from "./types/Student";

const routes = express.Router();

const studentsController = new StudentsController();

routes.get("/ping", (_, res) => res.json("pong"));

routes.get("/students", studentsController.get);
routes.post(
  "/students",
  celebrate({ body: Joi.object().keys(StudentSchema) }),
  studentsController.create
);
routes.put(
  "/students",
  celebrate({ body: Joi.object().keys(StudentPartialSchema) }),
  studentsController.update
);
routes.delete("/students/:studentId", studentsController.delete);

export default routes;
