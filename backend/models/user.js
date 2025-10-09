import { connection } from '../database/conn.js'

export class User {
    static async findAll(){
        const [rows] = await connection.execute('SELECT * FROM usuario')
        return rows
    }
    
    static async findOne(id){
        const [data] = await connection.execute('SELECT * FROM usuario WHERE id = ?', [id])
        return data[0]
    }

    static async create(nome,email,senha){
        const [data] = await connection.execute(
            'INSERT INTO usuario (nome,email,senha) VALUES(?,?,?)',
            [nome, email, senha]
        )
        return data
    }

}