import { connection } from '../database/conn.js'

export class Appointment{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM agendamentos')
        return rows
    }

    static async getByUserId(userId){
        const [rows] = await connection.execute(
            'SELECT * FROM agendamentos WHERE id_usuario = ? ORDER BY data_agendamento DESC',
            [userId]
        )
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

    static async getByDate(date){
        const [rows] = await connection.execute(
            'SELECT * FROM agendamentos WHERE DATE(data_agendamento) = ? ORDER BY data_agendamento',
            [date]
        )
        return rows
    }

    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM agendamentos WHERE id = ?', [id])
        return data[0]
    }

    static async getOneByUser(id, userId){
        const [data] = await connection.execute(
            'SELECT * FROM agendamentos WHERE id = ? AND id_usuario = ?',
            [id, userId]
        )
        return data[0]
    }

    static async create(id_usuario, id_veiculo, data_agendamento, preco_total, duracao_total_minutos, servicos, observacoes = null){
        const dataInicio = new Date(data_agendamento)
        const dataTerminoEstimada = new Date(dataInicio.getTime() + (duracao_total_minutos * 60 * 1000))
        
        const [data] = await connection.execute(
            `INSERT INTO agendamentos 
            (id_usuario, id_veiculo, data_agendamento, data_termino_estimada, preco_total, duracao_total_minutos, observacoes) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id_usuario, id_veiculo, data_agendamento, dataTerminoEstimada, preco_total, duracao_total_minutos, observacoes]
        )
        
        const agendamento_id = data.insertId
        
        for (let servico_id of servicos) {
            const [precoResult] = await connection.execute(
                `SELECT ps.id FROM preco_servicos ps 
                 JOIN veiculos v ON v.id_tipo_veiculo = ps.id_tipo_veiculo 
                 WHERE ps.id_servico = ? AND v.id = ?`,
                [servico_id, id_veiculo]
            )
            
            if (precoResult.length > 0) {
                await connection.execute(
                    'INSERT INTO agendamento_servicos (id_agendamento, id_preco_servico) VALUES (?, ?)',
                    [agendamento_id, precoResult[0].id]
                )
            }
        }
        
        return agendamento_id
    }

    static async update(id, status){
        let updateQuery = 'UPDATE agendamentos SET status = ?'
        let params = [status]
        
        if (status === 'em_andamento') {
            updateQuery += ', iniciado_em = NOW()'
        } else if (status === 'concluido') {
            updateQuery += ', finalizado_em = NOW()'
        }
        
        updateQuery += ' WHERE id = ?'
        params.push(id)
        
        const [data] = await connection.execute(updateQuery, params)
        return data
    }

    static async checkPacoteRubyWeekLimit(data_agendamento, servicos){
        const temPacoteRuby = servicos.includes(9)
        
        if(!temPacoteRuby) {
            return [] // Array vazio = pode agendar
        }

        const [rows] = await connection.execute(`
            SELECT a.id, a.data_agendamento
            FROM agendamentos a
            JOIN agendamento_servicos ash ON a.id = ash.id_agendamento  
            JOIN preco_servicos ps ON ash.id_preco_servico = ps.id
            WHERE ps.id_servico = 9
            AND a.status IN ('agendado', 'em_andamento', 'concluido')
            AND YEARWEEK(a.data_agendamento, 1) = YEARWEEK(?, 1)
        `, [data_agendamento])
        
        return rows
    }
}