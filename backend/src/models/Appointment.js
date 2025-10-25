import { connection } from '../database/conn.js'

export class Appointment{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM agendamentos')
        return rows
    }

    // 🔒 Método para buscar agendamentos de um usuário específico
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

    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM agendamentos WHERE id = ?', [id])
        return data[0]  // Retorna o objeto direto, não array
    }

    // 🔒 Método para buscar agendamento específico de um usuário
    static async getOneByUser(id, userId){
        const [data] = await connection.execute(
            'SELECT * FROM agendamentos WHERE id = ? AND id_usuario = ?',
            [id, userId]
        )
        return data[0]
    }

    static async create(id_usuario, id_veiculo, data_agendamento, preco_total, duracao_total_minutos, servicos, observacoes = null){
        const [data] = await connection.execute(
            `INSERT INTO agendamentos 
            (id_usuario, id_veiculo, data_agendamento, preco_total, duracao_total_minutos, observacoes) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [id_usuario, id_veiculo, data_agendamento, preco_total, duracao_total_minutos, observacoes]
        )
        
        const agendamento_id = data.insertId
        
        // 2. Inserir serviços (pega o id_preco_servico de cada um)
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
        
        // Atualização automática dos timestamps
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
}