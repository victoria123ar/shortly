import { connection } from "../db/db.js";

export async function creatUrl(res, req) {
  //ROTA AUTENTICADA

  const url = res.locals.url;
  const urlId = res.locals.urlId;

  try {
    await connection.query(`INSERT INTO urls ("shortUrl", url) VALUES ($1, $2, $3);`, [url, urlId.shortUrl]);

    res.status(201).send(urlId);

  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function listUrl(req, res) {}

export async function redirectUrl(req, res) {}

export async function deleteUrl(req, res) {}
