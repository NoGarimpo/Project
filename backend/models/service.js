import { connection } from '../database/conn.js'

export class Service{
    static async getAll(){
        const [rows] = connection.execute('SELECT * FROM servicos WHERE ativo = true')
        return rows
    }

    static async getOne(id){
        const [data] = connection.execute('SELECT * FROM servicos WHERE id = ?', [id])
        return data
    }
}