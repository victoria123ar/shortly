import { connection } from "../db/db.js";
import bcrypt from "bcrypt";

//ROTA NÃO AUTENTICADA

export async function signUp (req, res) {
    const { name, email, password } = res.locals.signUp;
    const passwordHashed = bcrypt.hashSync(password, 10);

    try {
        await connection.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
            [name, email, passwordHashed] 
        );

        res.status(201).send("Cadastro criado");
    } catch (error) {
        res.status(500).send(error.message);
    }
}