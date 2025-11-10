import { connection } from '../database/conn.js'

export class Marca {
    static async getByTipoVeiculo(id_tipo_veiculo) {
        const [rows] = await connection.execute(`
            SELECT m.id, m.marca 
            FROM marcas_veiculo m
            WHERE m.id_tipo_veiculo = ? AND m.ativo = TRUE 
            ORDER BY m.marca ASC
        `, [id_tipo_veiculo]);
        return rows;
    }

    static async getAll() {
        const [rows] = await connection.execute(`
            SELECT m.id, m.marca, tv.nome as tipo_veiculo
            FROM marcas_veiculo m
            JOIN tipos_veiculo tv ON m.id_tipo_veiculo = tv.id
            WHERE m.ativo = TRUE 
            ORDER BY tv.nome ASC, m.marca ASC
        `);
        return rows;
    }
}