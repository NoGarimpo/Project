import { Router } from "express"
import serviceController from "../controllers/servicecontroller.js"

const rota = Router()

/**
 * @swagger
 * /service/services:
 *   get:
 *     summary: Listar todos os serviços
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
rota.get('/services', serviceController.getAll)

/**
 * @swagger
 * /service/services/com-precos:
 *   get:
 *     summary: Listar serviços com preços para um tipo de veículo específico
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: tipo_veiculo_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tipo de veículo (obrigatório)
 *     responses:
 *       200:
 *         description: Serviços com informações de preços
 *       400:
 *         description: tipo_veiculo_id é obrigatório
 *       404:
 *         description: Nenhum serviço encontrado para este tipo de veículo
 */
rota.get('/services/com-precos', serviceController.getAllWithPrices)

/**
 * @swagger
 * /service/services/{id}:
 *   get:
 *     summary: Obter serviço por ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Dados do serviço
 *       404:
 *         description: Serviço não encontrado
 */
rota.get('/services/:id', serviceController.getOne)

export default rota