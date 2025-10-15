import { Appointment } from "../models/Appointment"

export default class appointmentController{
    static async getAll(req,res){
        try{
            const data = await Appointment.getAll()

            if(!data || data.lengh === 0){
                return res.status(404).json({
                    message: 'Nenhum agendamento encontrado.'
                })
            }

            res.json(data)
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

            const data = Appointment.getOne(id)

            if(!data || data.lengh === 0){
                return res.status(404).json({
                    message: 'agendamento não encontrado'
                })
            }

            res.json(data)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    static async getToday(req,res){
        try{
            const data = await Appointment.getToday()

            if(!data || data.lengh === 0){
                return res.status(404).json({
                    message: 'agendamento não encontrado'
                })
            }

            return res.json(data)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
}