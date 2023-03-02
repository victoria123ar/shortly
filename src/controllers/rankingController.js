import { connection } from "../db/db.js";

export async function listRanking(req, res) {
  // ROTA NÃO AUTENTICADA
  try {
    const result = await connection.query(
      `SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", 
      COALESCE(SUM(urls.views),0) AS "visitCount"
      FROM users
      LEFT JOIN urls ON users.id = urls."userId"
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10;`
    );

    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
