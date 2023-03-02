import { connection } from "../db/db.js";

export async function authenticationValidation(req, res, next) {
  const authentication = req.headers.authorization;

  if (!authentication) {
    return res.sendStatus(401);
  }
  const token = authentication.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const tokenExists = await connection.query(
      `SELECT * FROM sessions WHERE token=$1;`,
      [token]
    );

    if (tokenExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    const userId = tokenExists.rows[0].userId;

    const tokenValide = await connection.query(
      `SELECT * FROM users WHERE id=$1;`,
      [userId]
    );

    const user = tokenValide.rows[0];

    if (!tokenValide) {
      return res.status(401);
    }

    res.locals.user = user

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
