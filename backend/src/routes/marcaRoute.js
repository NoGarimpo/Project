import { Router } from 'express'
import marcaController from '../controllers/marcacontroller.js'

const rota = Router()

/**
 * @swagger
 * /marcas:
 *   get:
 *     summary: Listar todas as marcas de veículos
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista de marcas
 */
rota.get('/', marcaController.getAll)

export default rota