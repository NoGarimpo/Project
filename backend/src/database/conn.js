import mysql from 'mysql2/promise'

// Função para criar conexão
async function criarConexao() {
    return await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'nogarimpo',
        port: process.env.DB_PORT || 3306
    });
}

// Variável para armazenar a conexão
let connection;

async function conectar() {
    try {
        // Cria a conexão de forma assíncrona
        connection = await criarConexao();
        
        // Testa a conexão
        await connection.execute('SELECT 1');
        console.log('Conectado ao MySQL com sucesso!')
    } catch (error) {
        console.error('Erro ao conectar:', error.message)
    }
}

export { connection, conectar }
export default connection
