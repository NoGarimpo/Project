import { Router } from "express";
import carController from "../controllers/carcontroller.js";

const rota = Router()

rota.get('/getCar/:id', carController.getOne)

rota.delete('/:id', carController.delete)

rota.get('/getCars', carController.getAll)


export default rota