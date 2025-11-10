import { connection } from '../database/conn.js'

export class Modelo {
    static async getByMarca(id_marca_veiculo) {
        const [rows] = await connection.execute(`
            SELECT 
                mo.id,
                mo.modelo
            FROM modelos_veiculo mo
            WHERE mo.id_marca_veiculo = ? AND mo.ativo = TRUE
            ORDER BY mo.modelo ASC
        `, [id_marca_veiculo]);
        return rows;
    }
}