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
      [user.id, shortUrl, url]
    );

    const { rows: urls } = await connection.query(
      `SELECT * FROM urls WHERE "userId"=$1`,
      [user.id]
    );

    const [urlId] = urls;
    const id = urlId.id;

    res.status(201).send({ id, shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function listUrl(req, res) {
  //ROTA NÃO AUTENTICADA
  let { id } = req.params;

  try {
    const { rows: urls } = await connection.query(
      "SELECT * FROM urls WHERE id=$1",
      [id]
    );

    if (urls.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [urlId] = urls;
    const shortUrl = urlId.shortUrl;
    const url = urlId.url;

    res.status(201).send({ id, shortUrl, url });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function redirectUrl(req, res) {
  //ROTA NÃO AUTENTICADA
  const { shortUrl } = req.params;

  try {
    const urls = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl"=$1`,
      [shortUrl]
    );

    if (urls.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [url] = urls.rows;

    await connection.query(
      `UPDATE urls SET "views" = "views" + 1 WHERE id=$1`,
      [url.id]
    );

    res.redirect(url.url);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

export async function deleteUrl(req, res) {
  //ROTA AUTENTICADA
  const { id } = req.params;
  const user = res.locals.user;

  try {
    const { rows: urls } = await connection.query(
      "SELECT * FROM urls WHERE id=$1",
      [id]
    );

    if (urls.rowCount === 0) {
      return res.sendStatus(404);
    }

    if (urls.userId !== user.id) {
      return res.sendStatus(401);
    }

    await connection.query("DELETE FROM urls WHERE id=$1", [id]);

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
