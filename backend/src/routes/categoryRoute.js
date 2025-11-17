import { Router } from "express"
import categoryController from '../controllers/categorycontroller.js'

const rota = Router()

/**
 * @swagger
 * /category/getAll:
 *   get:
 *     summary: Listar todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
rota.get('/getAll', categoryController.getAll)

/**
 * @swagger
 * /category/createCategory:
 *   post:
 *     summary: Criar nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da categoria
 *               descricao:
 *                 type: string
 *                 description: Descrição da categoria
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Campos obrigatórios faltando
 */
rota.post('/createCategory', categoryController.create)

/**
 * @swagger
 * /category/getCategory/{id}:
 *   get:
 *     summary: Obter categoria por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da categoria
 */
rota.get('/getCategory/:id', categoryController.getOne)

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Atualizar status ativo da categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ativo
 *             properties:
 *               ativo:
 *                 type: boolean
 *                 description: Status ativo/inativo da categoria
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Categoria não encontrada
 */
rota.patch('/:id', categoryController.update)

export default rota