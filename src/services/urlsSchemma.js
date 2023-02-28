import joi from "joi";

export const urlSchemma = joi.object({
  url: joi.string().min(10).max(1500).required(),
});
