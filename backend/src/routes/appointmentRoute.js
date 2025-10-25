import { Router } from "express"
import appointmentController from "../controllers/appointmentcontroller.js"
import authenticate from '../middlewares/auth.js'

const rota = Router()

rota.get('/appointments', authenticate, appointmentController.getAll)
rota.get('/appointments/today', authenticate, appointmentController.getToday)
rota.get('/appointments/:id', authenticate, appointmentController.getOne)
rota.post('/appointments', authenticate, appointmentController.create)
rota.patch('/appointments/:id', authenticate, appointmentController.updateStatus)

export default rota