import { Router } from 'express'
import marcaController from '../controllers/marcacontroller.js'

const rota = Router()

// GET /api/marcas/marca?tipo_veiculo=1 - Marcas filtradas por tipo
rota.get('/marca', marcaController.getByTipo)

export default rota