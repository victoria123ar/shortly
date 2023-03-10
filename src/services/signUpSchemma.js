import joi from "joi";

export const signUpSchemma = joi.object({
  name: joi.string().min(2).max(50).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*_-]{6,30}$/)
    .required(),
  confirmPassword: joi.ref("password"),
});
