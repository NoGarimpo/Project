import { Router } from "express"
import serviceController from "../controllers/servicecontroller.js"

const rota = Router()

rota.get('/services', serviceController.getAll)

rota.get('/services/com-precos', serviceController.getAllWithPrices)

rota.get('/services/:id', serviceController.getOne)

export default rota