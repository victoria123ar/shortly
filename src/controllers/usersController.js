import { connection } from "../db/db.js";

export async function listUser(req, res) {
  //ROTA AUTENTICADA
  const user = res.locals.user;
  
  try {

    const visits = (await connection.query(`SELECT SUM(views) FROM urls WHERE "userId" = $1;`,
     [user.id])).rows[0];
     console.log(user)

  const userUrls = (await connection.query(`SELECT id, "shortUrl", url, views AS "visitCount" FROM urls WHERE "userId" = $1;`, 
  [user.id])).rows;

  return res.status(200).send({
    id: user.id,
    name: user.name,
    visitCount: visits.sum,
    shortenedUrls: userUrls,
  });
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
