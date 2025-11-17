import { Router } from 'express'
import modeloController from '../controllers/modelocontroller.js'

const rota = Router()

/**
 * @swagger
 * /modelos/modelo:
 *   get:
 *     summary: Obter modelos por marca
 *     tags: [Models]
 *     parameters:
 *       - in: query
 *         name: marca_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da marca
 *     responses:
 *       200:
 *         description: Lista de modelos da marca
 */
rota.get('/modelo', modeloController.getByMarca)

export default rota