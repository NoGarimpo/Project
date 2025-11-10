import { Modelo } from "../models/modelo.js";

export default class modeloController {
    static async getByMarca(req, res) {
        try{
            const { marca_id } = req.query
            
            if (!marca_id){
                return res.status(400).json({ 
                    message: 'marca_id é obrigatório' 
                })
            }

            const data = await Modelo.getByMarca(marca_id)
            
            if (!data || data.length === 0){
                return res.status(404).json({
                    message: 'Nenhum modelo encontrado para esta marca'
                })
            }

            return res.json(data)
        } 
        catch(error){
            console.error('Erro ao buscar modelos:', error)
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
}
