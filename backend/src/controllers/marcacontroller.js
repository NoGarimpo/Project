import { Marca } from "../models/marca.js";

export default class marcaController{
    static async getAll(req,res){
        try{
            const data = await Marca.getAll()
            if(!data || data.length === 0){
                return res.status(404).json({ message: 'Nenhuma marca encontrada' })
            }
            return res.json(data)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
    static async getByTipo(req,res){
        try{
            const { tipo_veiculo } = req.query
            
            if (!tipo_veiculo) {
                return res.status(400).json({ 
                    message: 'Parâmetro tipo_veiculo é obrigatório' 
                })
            }

            const data = await Marca.getByTipoVeiculo(tipo_veiculo)
            
            if(!data || data.length === 0){
                return res.status(404).json({ 
                    message: 'Nenhuma marca encontrada para este tipo de veículo' 
                })
            }
            
            return res.json(data)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
}