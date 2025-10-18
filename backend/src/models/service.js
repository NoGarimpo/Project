import { connection } from '../database/conn.js'

export class Service{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM servicos WHERE ativo = true')
        return rows
    }

    static async getOne(id){
        const [data] = await connection.execute('SELECT * FROM servicos WHERE id = ?', [id])
        return data
    }

    static async getAllWithPrices(tipo_veiculo_id){
        const [rows] = await connection.execute(`
            SELECT s.id, s.nome, s.descricao, ps.preco, ps.duracao_minutos 
            FROM servicos s 
            JOIN preco_servicos ps ON s.id = ps.id_servico 
            WHERE ps.id_tipo_veiculo = ? AND s.ativo = true AND ps.ativo = true
            ORDER BY s.nome
        `, [tipo_veiculo_id])
        return rows
    }
}