import { signInSchemma } from "../services/signInSchemma.js";
import { connection } from "../db/db.js";
import bcrypt from "bcrypt";

export async function validateSignIn(req, res, next) {
    const signIn = req.body;

    const { error } = signInSchemma.validate(signIn, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send({ errors });
    }

    const userExists = await connection.query(
        "SELECT * FROM users WHERE email=$1",
        [signIn.email]
      );
      
      if (userExists.rowCount === 0) 
      {
        return res.status(401).send("Email ou senha incorretos");
      }

      const passwordHashed = bcrypt.compareSync(signIn.password, userExists.rows[0].password);
    
      if (!passwordHashed)
      {
        return res.status(401).send("Email ou senha incorretos");
      }
      
      
      res.locals.userExists = userExists;
      res.locals.signIn = signIn;
    
      next();
}