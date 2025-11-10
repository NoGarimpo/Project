import { Router } from 'express'
import modeloController from '../controllers/modelocontroller.js'

const rota = Router()

// GET /api/modelos/modelo?marca_id=1 - Modelos filtrados por marca
rota.get('/modelo', modeloController.getByMarca)

export default rota