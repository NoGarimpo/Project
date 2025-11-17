import { Router } from "express"
import typeController from "../controllers/typecontroller.js"

const rota = Router()

/**
 * @swagger
 * /vehicletype/getAll:
 *   get:
 *     summary: Listar todos os tipos de veículos
 *     tags: [Vehicle Types]
 *     responses:
 *       200:
 *         description: Lista de tipos de veículos
 */
rota.get('/getAll', typeController.getAll)

/**
 * @swagger
 * /vehicletype/getType/{id}:
 *   get:
 *     summary: Obter tipo de veículo por ID
 *     tags: [Vehicle Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do tipo de veículo
 */
rota.get('/getType/:id', typeController.getOne)

export default rota