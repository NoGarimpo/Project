import { connection } from '../database/conn.js'

export class Veiculo{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM veiculo')
        return rows
    }
    
    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM veiculo WHERE id = ?', [id])
        return data[0]
    }
    
    static async delete(id){
        const [data] = await connection.execute('DELETE FROM veiculo WHERE id = ?', [id])
        return data
    }
}