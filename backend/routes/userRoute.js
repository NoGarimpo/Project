import { Router } from "express"
import userController from '../controllers/usercontroller.js'

const rota = Router()

rota.get('/getUsers', userController.getAll)

rota.post('/createUser', userController.create)

rota.put('/:id', userController.update)

rota.get('/getUser/:id', userController.getOne)

export default rota