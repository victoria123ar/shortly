import { connection } from "../db/db.js"
import { v4 as uuidV4 } from "uuid";

//ROTA NÃO AUTENTICADA

export async function signIn (req, res) {
   
    const id = res.locals.userExists.rows[0].id;
    const token = uuidV4();

    try {
        await connection.query(
            "INSERT INTO sessions ( token, userid ) VALUES ($1, $2);",
            [token, id] 
        );

        res.status(200).send({ token} );
    } catch (error) {
        res.status(500).send(error.message);
    }
}