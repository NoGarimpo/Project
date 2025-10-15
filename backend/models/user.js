import { connection } from '../database/conn.js'

export class User {
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM usuarios')
        return rows
    }
    
    static async getOne(id){
        const [data] = await connection.execute(
            'SELECT * FROM usuarios WHERE id = ?', [id]
        )
        return data[0]
    }

    static async create(nome,email,senha){
        const [data] = await connection.execute(
            'INSERT INTO usuarios (nome,email,senha) VALUES(?,?,?)',
            [nome, email, senha]
        )
        return data
    }

  static async update(id, nome, email, senha){
        const [data] = await connection.execute(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [nome, email, senha, id]
        )
        return data
    }

    static async emailexist(email){
        const [data] = await connection.execute(
            'SELECT * from usuarios WHERE email = ?',[email]
        )
        return data
    }

}