import { Router } from "express"
import appointmentController from "../controllers/appointmentcontroller.js"
import authenticate from '../middlewares/auth.js'

const rota = Router()

/**
 * @swagger
 * /appointment/appointments:
 *   get:
 *     summary: Listar agendamentos do usuário logado
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos do usuário
 *       404:
 *         description: Nenhum agendamento encontrado
 *       401:
 *         description: Não autorizado
 */
rota.get('/appointments', authenticate, appointmentController.getAll)

/**
 * @swagger
 * /appointment/appointments/today:
 *   get:
 *     summary: Listar agendamentos de hoje (apenas funcionários e admins)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Agendamentos de hoje
 *       403:
 *         description: Acesso negado. Apenas funcionários podem ver a agenda completa
 *       404:
 *         description: Nenhum agendamento encontrado para hoje
 */
rota.get('/appointments/today', authenticate, appointmentController.getToday)

/**
 * @swagger
 * /appointment/appointments/{id}:
 *   get:
 *     summary: Obter agendamento por ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Dados do agendamento
 *       404:
 *         description: Agendamento não encontrado
 */
rota.get('/appointments/:id', authenticate, appointmentController.getOne)

/**
 * @swagger
 * /appointment/appointments:
 *   post:
 *     summary: Criar novo agendamento
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_veiculo
 *               - data_agendamento
 *               - preco_total
 *               - duracao_total_minutos
 *               - servicos
 *             properties:
 *               id_veiculo:
 *                 type: integer
 *                 description: ID do veículo
 *               data_agendamento:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora do agendamento
 *               preco_total:
 *                 type: number
 *                 format: float
 *                 description: Preço total dos serviços
 *               duracao_total_minutos:
 *                 type: integer
 *                 description: Duração total em minutos
 *               servicos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array de IDs dos serviços
 *               observacoes:
 *                 type: string
 *                 description: Observações adicionais (opcional)
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *       400:
 *         description: Campos obrigatórios faltando
 *       409:
 *         description: Limite de agendamentos atingido (4 por dia) ou Pacote Ruby já agendado na semana
 */
rota.post('/appointments', authenticate, appointmentController.create)

/**
 * @swagger
 * /appointment/appointments/{id}:
 *   patch:
 *     summary: Atualizar status do agendamento (apenas o próprio usuário)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [agendado, em_andamento, concluido, cancelado]
 *                 description: Novo status do agendamento
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       400:
 *         description: ID ou status inválido
 *       404:
 *         description: Agendamento não encontrado
 */
rota.patch('/appointments/:id', authenticate, appointmentController.updateStatus)

export default rota