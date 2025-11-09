import { connection } from '../database/conn.js'

export class Veiculo{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM veiculos')
        return rows
    }

    static async getByUserId(userId){
        const [rows] = await connection.execute(
            'SELECT * FROM veiculos WHERE id_usuario = ? ORDER BY created_at DESC',
            [userId]
        )
        return rows
    }
    
    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM veiculos WHERE id = ?', [id])
        return data[0]
    }

    static async getOneByUser(id, userId){
        const [data] = await connection.execute(
            'SELECT * FROM veiculos WHERE id = ? AND id_usuario = ?',
            [id, userId]
        )
        return data[0]
    }
    
    static async delete(id){
        const [data] = await connection.execute('DELETE FROM veiculos WHERE id = ?', [id])
        return data
    }

    static async create(marca,modelo,ano,placa,foto,id_usuario,id_tipo_veiculo){
        const [data] = await connection.execute(
            'INSERT INTO veiculos(marca,modelo,ano,placa,foto,id_usuario,id_tipo_veiculo) VALUES(?,?,?,?,?,?,?)',
            [marca,modelo,ano,placa,foto,id_usuario,id_tipo_veiculo]
        )
        return data
    }

    static async update(id,placa,foto){
        const [data] = await connection.execute(
            'UPDATE veiculos SET placa = ?, foto = ? WHERE id = ?',
            [placa, foto, id]
        )
        return data
    }

    static async placaExist(placa){
        const [data] = await connection.execute(
            'SELECT * from veiculos WHERE placa = ?',[placa]
        )
        return data[0]
    }
}