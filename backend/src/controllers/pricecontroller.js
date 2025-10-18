import { Price } from "../models/servicePrice.js";

export default class priceController {
    static async getPrice(req, res) {
        try{
            const { servico_id, tipo_veiculo_id } = req.query
            
            if (!servico_id || !tipo_veiculo_id){
                return res.status(400).json({ 
                    message: 'servico_id e tipo_veiculo_id são obrigatórios' 
                })
            }

            const data = await Price.getPrice(tipo_veiculo_id, servico_id)
            
            if (!data){
                return res.status(404).json({
                    message: 'Preço não encontrado'
                })
            }

            return res.json(data)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
}