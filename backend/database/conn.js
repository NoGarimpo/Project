import mysql from 'mysql2/promise'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nogarimpo',
    port: 3306
})

async function conectar() {
    try {
        await connection.connect();
        console.log('✅ Conectado ao MySQL com sucesso!')
    } catch (error) {
        console.error('❌ Erro ao conectar:', error.message)
    }
}

export { connection, conectar }
export default connection
