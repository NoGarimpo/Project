import { connection } from '../database/conn.js'

export class Category{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM categorias WHERE ativo = true')
        return rows
    }

    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM categorias WHERE id = ?', [id])
        return data
    }

    static async create(nome,descricao){
        const [data] = await connection.execute(
            'INSERT INTO categorias(nome,descricao) VALUES(?,?)',
            [nome,descricao]
        )
        return data
    }

    static async update(id,ativo){
        const [data] = await connection.execute(
            'UPDATE categorias SET ativo = ? WHERE id = ?', [ativo, id]
        )
        return data
    }
}