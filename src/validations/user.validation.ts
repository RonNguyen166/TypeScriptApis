import Joi from "joi";
import { password, objectId } from "./custom.validation";

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().valid("user", "admin"),
  }),
};
const getAll = {
  query: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string(),
  }),
};

const getOne = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateOne = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().custom(password),
  }),
};

const deleteOne = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
export { create, deleteOne, updateOne, getAll, getOne };
