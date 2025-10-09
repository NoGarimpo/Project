import { connection } from '../database/conn.js'
import { Veiculo } from '../models/car.js'

export default class carController{
    static async getAll(req,res){
        try{
            const cars = await Veiculo.getAll()
            if(!cars || cars.length === 0){
                return res.status(404).json({message: 'Nenhum veículo encontrado'})
            }
            res.json(cars)
        } catch(error){
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    static async getOne(req,res){
        try{
            const {id} = req.params

            if(!id || isNaN(id)){
                return res.status(400).json({ 
                    error: 'ID inválido' 
                })
            }

            const car = await Veiculo.getOne(id)
            
            if(!car){
                return res.status(404).json({message: `carro com id: ${id} não encontrado`})
            }

            res.json(car)
        } catch(error){
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    static async delete(req,res){
        try{
            const {id} = req.params
            
            if(!id || isNaN(id)){
                return res.status(400).json({ 
                    error: 'ID inválido' 
                })
            }

            const car = await Veiculo.getOne(id)
            if(!car){
                return res.status(404).json({
                    message: `Veículo com id: ${id} não encontrado`
                })
            }

            await Veiculo.delete(id)
            res.status(200).json({
                message: `Veículo com id: ${id} deletado com sucesso`
            })
        } catch(error){
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

}