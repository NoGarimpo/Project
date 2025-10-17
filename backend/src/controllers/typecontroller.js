import { Type } from "../models/veiculoType.js"

export default class typeController{
    static async getAll(req,res){
        try{
            const data = await Type.getAll()

            if(!data || data.lenght === 0){
                return res.status(404).json({ message: 'Nenhum tipo encontrado' })
            }

            res.json(data)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
    
    static async getOne(req,res){
        const {id} = req.params

        if(!id || isNaN(id)){
            return res.status(400).json({
                message: 'ID inválido'
            })
        }

        const type = await Type.getOne(id)

        res.json(type)
    }
}