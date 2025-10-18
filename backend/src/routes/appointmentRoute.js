import { Router } from "express"
import appointmentController from "../controllers/appointmentcontroller.js"

const rota = Router()

rota.get('/appointments', appointmentController.getAll)

rota.get('/appointments/today', appointmentController.getToday)

rota.get('/appointments/:id', appointmentController.getOne)

rota.post('/appointments', appointmentController.create)

rota.patch('/appointments/:id', appointmentController.updateStatus)

export default rota