import { connection } from "../db/db.js";

export async function listUser(req, res) {
  const user = res.locals.user;
  
  try {
    const usersId = await connection.query(
      `SELECT id, name FROM users WHERE id=$1`,
        [user.id]
        );
        
    const urls = await connection.query(
      `SELECT id, "shortUrl", url, views AS "visitCount" FROM urls WHERE "userId"=$1`,
        [user.id]
        );

    const userData = usersId.rows[0];
    userData.shortenedUrls = urls.rows;

    res.send(userData);
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
