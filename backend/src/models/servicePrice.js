import { connection } from '../database/conn.js'

export class Price{
    static async getPrice(id_tipo_veiculo, id_servico){
        const [data] = await connection.execute(
            'SELECT preco, duracao_minutos FROM preco_servicos WHERE id_tipo_veiculo = ? AND id_servico = ?',
            [id_tipo_veiculo, id_servico]
        )
        return data[0]
    }
}