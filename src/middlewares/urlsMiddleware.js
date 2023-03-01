import { urlSchemma } from "../services/urlsSchemma.js";

export async function validateUrl(req, res, next) {
  try {

    const { error } = urlSchemma.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send({ errors });
    }

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
