import { Service } from "../models/service.js";

export default class serviceController{
    static async getAll(req,res){
        try{
            const rows = await Service.getAll()
            if(!rows || rows.length === 0){
                res.status(404).json({
                    message:'nenhum serviço encontrado'
                })
            }
            res.json(rows)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
    
    static async getOne(req,res){
        try{
            const {id} = req.params

            if(!id || isNaN(id)){
                return res.status(400).json({ 
                    message: 'ID inválido' 
                })
            }
            const data = await Service.getOne(id)

            if(!data || data.length === 0){
                return res.status(404).json({
                    message: 'serviço não encontrado'
                })
            }

            return res.json(data)
        }
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    static async getAllWithPrices(req,res){
        try{
            const { tipo_veiculo_id } = req.query

            if(!tipo_veiculo_id || isNaN(tipo_veiculo_id)){
                return res.status(400).json({ 
                    message: 'tipo_veiculo_id é obrigatório' 
                })
            }

            const rows = await Service.getAllWithPrices(tipo_veiculo_id)
            
            if(!rows || rows.length === 0){
                return res.status(404).json({
                    message:'nenhum serviço encontrado para este tipo de veículo'
                })
            }

            return res.json(rows)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
}