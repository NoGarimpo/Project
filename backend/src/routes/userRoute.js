import { Router } from "express"
import userController from '../controllers/usercontroller.js'
import authenticate from '../middlewares/auth.js'

const rota = Router()

rota.post('/createUser', userController.create)
rota.post('/login', userController.login)
rota.post('/logout', userController.logout)

rota.get('/getUsers', authenticate, userController.getAll)
rota.get('/getUser/:id', authenticate, userController.getOne)
rota.put('/:id', authenticate, userController.update)

export default rota