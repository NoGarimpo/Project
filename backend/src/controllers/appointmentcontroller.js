import { Appointment } from "../models/Appointment.js"

export default class appointmentController{
    static async getAll(req,res){
        try{
            const data = await Appointment.getAll()

            if(!data || data.length === 0){
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

            const data = await Appointment.getOne(id)

            if(!data || data.length === 0){
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

            if(!data || data.length === 0){
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

    static async create(req,res){
        try{
            const { id_usuario, id_veiculo, data_agendamento, preco_total, duracao_total_minutos, servicos, observacoes } = req.body

            if(!id_usuario || !id_veiculo || !data_agendamento || !preco_total || !duracao_total_minutos || !servicos){
                return res.status(400).json({
                    message: 'Campos obrigatórios: id_usuario, id_veiculo, data_agendamento, preco_total, duracao_total_minutos, servicos'
                })
            }

            if(!Array.isArray(servicos) || servicos.length === 0){
                return res.status(400).json({
                    message: 'servicos deve ser um array com pelo menos um item'
                })
            }

            const agendamento_id = await Appointment.create(
                id_usuario, 
                id_veiculo, 
                data_agendamento, 
                preco_total, 
                duracao_total_minutos, 
                servicos, 
                observacoes
            )
            
            res.status(201).json({
                message: 'Agendamento criado com sucesso',
                id: agendamento_id
            })
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    static async updateStatus(req,res){
        try{
            const { id } = req.params
            const { status } = req.body

            if(!id || isNaN(id)){
                return res.status(400).json({
                    message: 'ID inválido'
                })
            }

            if(!status){
                return res.status(400).json({
                    message: 'Status é obrigatório'
                })
            }

            const validStatus = ['agendado', 'em_andamento', 'concluido', 'cancelado']
            if(!validStatus.includes(status)){
                return res.status(400).json({
                    message: 'Status deve ser: agendado, em_andamento, concluido ou cancelado'
                })
            }

            await Appointment.update(id, status)
            
            res.json({
                message: 'Status atualizado com sucesso'
            })
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
}