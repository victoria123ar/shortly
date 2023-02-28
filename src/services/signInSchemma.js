import joi from "joi";

export const signInSchemma = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
});
