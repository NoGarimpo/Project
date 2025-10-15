import { Router } from "express"
import typeController from "../controllers/typecontroller"

const rota = Router()

rota.get('/getAll', typeController.getAll)

rota.get('/getType/:id', typeController.getOne)

export default rota