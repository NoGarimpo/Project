import { Router } from "express"
import appointmentController from "../controllers/appointmentcontroller.js"

const rota = Router()

rota.get('/getAppointments', appointmentController.getAll)

rota.get('getAppointments/today', appointmentController.getToday)

rota.get('/getAppointment/:id', appointmentController.getOne)

export default rota