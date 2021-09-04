import { Joi } from "celebrate";

export interface Student {
  id?: number;
  name: string;
  birth: Date;
  email: string;
  city: string;
}

export const StudentSchema = {
  id: Joi.number(),
  name: Joi.string().required(),
  birth: Joi.date().required(),
  email: Joi.string().required().email(),
  city: Joi.string().required(),
};

export const StudentPartialSchema = {
  id: Joi.number().required(),
  name: Joi.string(),
  birth: Joi.date(),
  email: Joi.string().email(),
  city: Joi.string(),
};
