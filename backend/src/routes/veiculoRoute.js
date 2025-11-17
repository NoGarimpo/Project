import { Router } from "express"
import carController from "../controllers/carcontroller.js"
import authenticate from '../middlewares/auth.js'
import { uploadCarImage, handleUploadError } from '../middlewares/upload.js'

const rota = Router()

/**
 * @swagger
 * /car/getCars:
 *   get:
 *     summary: Listar veículos do usuário logado
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de veículos do usuário
 *       404:
 *         description: Nenhum veículo encontrado
 */
rota.get('/getCars', authenticate, carController.getAll)

/**
 * @swagger
 * /car/createCar:
 *   post:
 *     summary: Criar novo veículo para o usuário logado
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - marca
 *               - modelo
 *               - ano
 *               - placa
 *               - id_tipo
 *             properties:
 *               marca:
 *                 type: string
 *                 description: Marca do veículo
 *               modelo:
 *                 type: string
 *                 description: Modelo do veículo
 *               ano:
 *                 type: integer
 *                 minimum: 1900
 *                 description: Ano do veículo (1900 até ano atual + 1)
 *               placa:
 *                 type: string
 *                 description: Placa no formato ABC1234 ou ABC1D23
 *               id_tipo:
 *                 type: integer
 *                 description: ID do tipo de veículo
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Foto do veículo (opcional)
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *       400:
 *         description: Campos obrigatórios faltando ou placa inválida
 *       404:
 *         description: Tipo de veículo não encontrado
 *       409:
 *         description: Placa já está em uso
 */
rota.post('/createCar', authenticate, uploadCarImage, handleUploadError, carController.create)

/**
 * @swagger
 * /car/getCar/{id}:
 *   get:
 *     summary: Obter veículo por ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do veículo
 */
rota.get('/getCar/:id', authenticate, carController.getOne)

/**
 * @swagger
 * /car/{id}:
 *   delete:
 *     summary: Deletar veículo
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo deletado
 */
rota.delete('/:id', authenticate, carController.delete)

/**
 * @swagger
 * /car/{id}:
 *   patch:
 *     summary: Atualizar placa e/ou foto do veículo
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - placa
 *             properties:
 *               placa:
 *                 type: string
 *                 description: Nova placa (formato ABC1234 ou ABC1D23)
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Nova foto do veículo (opcional)
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *       400:
 *         description: ID ou placa inválida
 *       404:
 *         description: Veículo não encontrado
 *       409:
 *         description: Placa já está em uso por outro veículo
 */
rota.patch('/:id', authenticate, uploadCarImage, handleUploadError, carController.update)

export default rota