import { connection } from '../database/conn.js'

export class User {
    static async findAll(){
        const [rows] = await connection.execute('SELECT * FROM usuario')
        return rows
    }
}