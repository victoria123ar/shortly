import { connection } from "../db/db.js";
import { nanoid } from "nanoid";

export async function creatUrl(req, res) {
  //ROTA AUTENTICADA
  const { url } = req.body;
  const shortUrl = nanoid();
  const user = res.locals.user;

  try {
    await connection.query(
      `INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3);`,
      [user, shortUrl, url]
    );

    const { rows: urls } = await connection.query(`SELECT * FROM urls WHERE "userId" = $1`,
    [user]
  );

    const [urlId] = urls;
    const id = urlId.id

    res.status(201).send({ id, shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
/* 
export async function listUrl(req, res) {}

export async function redirectUrl(req, res) {}

export async function deleteUrl(req, res) {}
 */
