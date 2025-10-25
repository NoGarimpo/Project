import express from 'express'
import 'dotenv/config'

import cors from 'cors'
import { conectar } from './src/database/conn.js'

import userRouter from './src/routes/userRoute.js'
import veiculoRouter from './src/routes/veiculoRoute.js'
import categoryRouter from './src/routes/categoryRoute.js'
import appointmentRouter from './src/routes/appointmentRoute.js'
import serviceRouter from './src/routes/serviceRoute.js'
import veiculoTypeRouter from './src/routes/veiculotype.js'
import service_priceRouter from './src/routes/service_priceRoute.js'

const app = express()

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

app.use('/user', userRouter)
app.use('/car', veiculoRouter)
app.use('/category', categoryRouter)
app.use('/appointment', appointmentRouter)
app.use('/service', serviceRouter)
app.use('/vehicletype', veiculoTypeRouter)
app.use('/prices', service_priceRouter)

app.listen(process.env.PORT, async (error)=>{
    if(error){
        console.log(error)
        return
    }
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
    
    // Conectar ao banco de dados
    await conectar()
})