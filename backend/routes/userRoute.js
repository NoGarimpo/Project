import { Router } from "express";
import userController from '../controllers/usercontroller.js'

const rota = Router()

rota.get('/getUser/:id', userController.getOne)

rota.get('/getUsers', userController.getAll)

rota.post('/createUser', userController.create)


export default rota