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

export async function authenticationValidation(req, res, next) {
  const authentication = req.headers.authorization;
  const signIn = res.locals.signIn;

  if (!authentication) {
    return res.sendStatus(401);
  }
  const token = authentication.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const tokenExists = await connection.query(
      `SELECT * FROM users WHERE token=$1;`,
      [token]
    );

    if (tokenExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    const tokenValide = await connection.query(
      `SELECT * FROM users WHERE email=$1;`,
      [signIn.email]
    );

    if (emailExists.rows[0].token !== tokenValide) {
      return res.status(401);
    }
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}