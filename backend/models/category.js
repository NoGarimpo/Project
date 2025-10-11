import { connection } from '../database/conn.js'

export class Category{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM categoria')
        return rows
    }

    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM categoria WHERE id = ?', [id])
        return data
    }

    static async create(nome,descricao){
        const [data] = await connection.execute(
            'INSERT INTO categoria(nome,descricao) VALUES(?,?)',
            [nome,descricao]
        )
        return data
    }

    static async update(id,ativo){
        const [data] = await connection.execute(
            'UPDATE categoria SET ativo = ? WHERE id = ?', [ativo, id]
        )
        return data
    }
}