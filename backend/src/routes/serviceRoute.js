import { Router } from "express"
import serviceController from "../controllers/servicecontroller.js"

const rota = Router()

rota.get('/services', serviceController.getAll)
rota.get('/services/:id', serviceController.getOne)

export default rota