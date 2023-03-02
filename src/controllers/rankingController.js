import { connection } from "../db/db";

export async function listRanking(res, req){
    // ROTA NÃO AUTENTICADA
    try {
        
        
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}