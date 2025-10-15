import { connection } from '../database/conn.js'

export class Appointment{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM agendamentos')
        return rows
    }

    static async getToday(){
        const [rows] = await connection.execute(
            `
                SELECT * FROM agendamentos 
                WHERE DATE(data_agendamento) = CURDATE()
                ORDER BY data_agendamento
            `
        )
        return rows
    }

    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM agendamentos WHERE id = ?', [id])
        return data
    }

    static async create(id_usuario, id_veiculo, data_agendamento, preco, duracao_total, observacoes){
        // coming soon
    }

    static async update(id, status){
        const [data] = await connection.execute('UPDATE agendamentos SET status = ?, WHERE id = ?', [status, id])
        return data
    }
}