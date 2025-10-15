import { Router } from "express"
import categoryController from '../controllers/categorycontroller.js'

const rota = Router()

rota.get('/getAll', categoryController.getAll)

rota.post('/createCategory', categoryController.create)

rota.get('/getCategory/:id', categoryController.getOne)

rota.patch('/:id', categoryController.update)

export default rota