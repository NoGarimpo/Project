import { Router } from "express"
import userController from '../controllers/usercontroller.js'
import authenticate from '../middlewares/auth.js'

const rota = Router()

/**
 * @swagger
 * /user/createUser:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 minLength: 6
 *                 description: Senha com pelo menos 6 caracteres
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso, retorna token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Dados inválidos ou senha muito curta
 *       409:
 *         description: Email já está em uso
 */
rota.post('/createUser', userController.create)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Campos inválidos ou senha muito curta
 *       401:
 *         description: Email ou senha incorretos
 */
rota.post('/login', userController.login)

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Fazer logout
 *     tags: [Users]
 *     security: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
rota.post('/logout', userController.logout)

/**
 * @swagger
 * /user/getUsers:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autorizado
 */
rota.get('/getUsers', authenticate, userController.getAll)

/**
 * @swagger
 * /user/getUser/{id}:
 *   get:
 *     summary: Obter usuário por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuário não encontrado
 */
rota.get('/getUser/:id', authenticate, userController.getOne)

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualizar próprio usuário (apenas o próprio usuário pode editar seu perfil)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário (deve ser o mesmo do token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 minLength: 6
 *                 description: Nova senha (opcional, mínimo 6 caracteres)
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Campos obrigatórios faltando ou inválidos
 *       403:
 *         description: Você só pode editar seu próprio perfil
 *       404:
 *         description: Usuário não encontrado
 *       409:
 *         description: Email já está em uso por outro usuário
 */
rota.put('/:id', authenticate, userController.update)

export default rota