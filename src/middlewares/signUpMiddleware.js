import { signUpSchemma } from "../services/signUpSchemma.js";
import { connection } from "../db/db.js";

export async function validateSignUp(req, res, next) {
    const signUp = req.body;

    const { error } = signUpSchemma.validate(signUp, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send({ errors });
    }

    const emailExists = await connection.query(
        "SELECT * FROM users WHERE email=$1",
        [signUp.email]
      );
    
      if (
        emailExists.rowCount !== 0 ) {
        return res.status(409).send("Usuário já cadastrado");
      }
    
      res.locals.signUp = signUp;
    
      next();
}