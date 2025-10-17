import { connection } from '../database/conn.js'

export class Veiculo{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM veiculos')
        return rows
    }
    
    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM veiculos WHERE id = ?', [id])
        return data[0]
    }
    
    static async delete(id){
        const [data] = await connection.execute('DELETE FROM veiculos WHERE id = ?', [id])
        return data
    }

    static async create(marca,modelo,ano,placa,foto,id_usuario,id_tipo){
        const [data] = await connection.execute(
            'INSERT INTO veiculo(marca,modelo,ano,placa,foto,id_usuario,id_tipo_veiculo) VALUES(?,?,?,?,?,?,?)',
            [marca,modelo,ano,placa,foto,id_usuario,id_tipo]
        )
        return data
    }

    static async update(id,placa,foto){
        const [data] = await connection.execute(
            'UPDATE veiculo SET placa = ?, foto = ? WHERE id = ?',
            [placa, foto, id]
        )
        return data
    }

    static async placaExist(placa){
        const [data] = await connection.execute(
            'SELECT * from veiculo WHERE placa = ?',[placa]
        )
        return data[0]
    }
}