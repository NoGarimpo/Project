import { connection } from '../database/conn.js'

export class Type{
    static async getAll(){
        const [rows] = connection.execute('SELECT * FROM tipos_veiculo WHERE ativo = true')
        return rows
    }

    static async getOne(id){
        const [data] = connection.execute('SELECT * FROM tipos_veiculo WHERE id = ?', [id])
        return data
    }
}