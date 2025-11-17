import { Router } from "express"
import priceController from "../controllers/pricecontroller.js"

const rota = Router()

/**
 * @swagger
 * /prices/price:
 *   get:
 *     summary: Obter preço de serviço para um tipo de veículo específico
 *     tags: [Prices]
 *     parameters:
 *       - in: query
 *         name: servico_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *       - in: query
 *         name: tipo_veiculo_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tipo de veículo
 *     responses:
 *       200:
 *         description: Preço do serviço para o tipo de veículo
 *       400:
 *         description: servico_id e tipo_veiculo_id são obrigatórios
 *       404:
 *         description: Preço não encontrado
 */
rota.get('/price', priceController.getPrice)

export default rota