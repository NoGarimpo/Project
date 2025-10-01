import express from 'express'
import cors from 'cors'
import { conectar } from './database/conn.js'

const app = express()
const port = 8000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))


app.listen(port, async (error)=>{
    if(error){
        console.log(error)
        return
    }
    console.log(`Servidor rodando em http://localhost:${port}`)
    
    // Conectar ao banco de dados
    await conectar()
})