import { Router } from "express"
import carController from "../controllers/carcontroller.js"
import authenticate from '../middlewares/auth.js'
import { uploadCarImage, handleUploadError } from '../middlewares/upload.js'

const rota = Router()

rota.get('/getCars', authenticate, carController.getAll)
rota.post('/createCar', authenticate, uploadCarImage, handleUploadError, carController.create)
rota.get('/getCar/:id', authenticate, carController.getOne)
rota.delete('/:id', authenticate, carController.delete)
rota.patch('/:id', authenticate, uploadCarImage, handleUploadError, carController.update)

export default rota