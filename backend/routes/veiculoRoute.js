import { Router } from "express";
import carController from "../controllers/carcontroller.js";

const rota = Router()

rota.get('/getCars', carController.getAll)

rota.post('/createCar', carController.create)

rota.get('/getCar/:id', carController.getOne)

rota.delete('/:id', carController.delete)

rota.patch('/:id', carController.update)

export default rota