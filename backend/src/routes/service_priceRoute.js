import { Router } from "express"
import priceController from "../controllers/pricecontroller.js"

const rota = Router()

rota.get('/price', priceController.getPrice)

export default rota