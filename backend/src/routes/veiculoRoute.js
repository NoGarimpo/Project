import { Router } from "express"
import carController from "../controllers/carcontroller.js"
import authenticate from '../middlewares/auth.js'

const rota = Router()

rota.get('/getCars', authenticate, carController.getAll)
rota.post('/createCar', authenticate, carController.create)
rota.get('/getCar/:id', authenticate, carController.getOne)
rota.delete('/:id', authenticate, carController.delete)
rota.patch('/:id', authenticate, carController.update)

export default rota