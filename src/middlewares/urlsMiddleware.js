import { urlSchemma } from "../services/urlsSchemma.js";
import { nanoid } from "nanoid";

export async function validateUrl(req, res, next) {
  const url = req.body;

  try {
    console.log(url);
    console.log(nanoid());

    const urlId = {
      shortUrl: nanoid(),
    };

    const { error } = urlSchemma.validate(url, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send({ errors });
    }

    res.locals.url = url;
    res.locals.urlId = urlId;

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
