import { Router } from 'express'
import marcaController from '../controllers/marcacontroller.js'

const rota = Router()

rota.get('/', marcaController.getAll)

export default rota