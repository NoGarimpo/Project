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
            SELECT m.id, m.marca 
            FROM marcas_veiculo m
            WHERE m.ativo = TRUE 
            ORDER BY m.marca ASC
        `);
        return rows;
    }
}