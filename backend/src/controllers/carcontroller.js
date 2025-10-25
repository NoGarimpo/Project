import { Veiculo } from '../models/car.js'
import { User } from '../models/user.js'
import { Type } from "../models/veiculoType.js"

export default class carController{
    static async getAll(req,res){
        try{
            const userId = req.user.id
            
            const cars = await Veiculo.getByUserId(userId)
            
            if(!cars || cars.length === 0){
                return res.status(404).json({ message: 'Nenhum veículo encontrado' })
            }
            res.json(cars)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    static async getOne(req,res){
        try{
            const {id} = req.params
            const userId = req.user.id

            if(!id || isNaN(id)){
                return res.status(400).json({ 
                    message: 'ID inválido' 
                })
            }

            const car = await Veiculo.getOneByUser(id, userId)
            
            if(!car){
                return res.status(404).json({message: `Veículo não encontrado`})
            }

            res.json(car)
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    static async delete(req,res){
        try{
            const {id} = req.params
            const userId = req.user.id
            
            if(!id || isNaN(id)){
                return res.status(400).json({ 
                    message: 'ID inválido' 
                })
            }

            // 🔒 Verifica se o carro pertence ao usuário
            const car = await Veiculo.getOneByUser(id, userId)
            if(!car){
                return res.status(404).json({
                    message: `Veículo não encontrado`
                })
            }

            await Veiculo.delete(id)
            res.status(200).json({
                message: `Veículo deletado com sucesso`
            })
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    static async create(req,res){
        try{
            const {marca,modelo,ano,placa,foto,id_tipo} = req.body
            const id_usuario = req.user.id
            
            if(!marca || !modelo || !ano || !placa || !id_tipo ){
                return res.status(400).json({
                    message: 'Por favor preencha todos os campos obrigatórios.'
                })
            }

            if(marca.trim() === '' || modelo.trim() === '' || placa.trim() === ''){
                return res.status(400).json({
                    message: 'Marca, modelo e placa não podem estar vazios.'
                })
            }

            const currentYear = new Date().getFullYear()
            const anoInt = parseInt(ano)
            if(isNaN(anoInt) || anoInt < 1900 || anoInt > currentYear + 1){
                return res.status(400).json({
                    message: 'Ano deve ser um número válido entre 1900 e ' + (currentYear + 1)
                })
            }

            const placaRegex = /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/
            const placaUpper = placa.toUpperCase().replace(/[^A-Z0-9]/g, '')
            if(!placaRegex.test(placaUpper)){
                return res.status(400).json({
                    message: 'Formato de placa inválido. Use o formato ABC1234 ou ABC1D23'
                })
            }

            const typeVehicle = await Type.getOne(id_tipo)

            if(!typeVehicle){
                return res.status(404).json({
                    message: 'tipo não encontrado'
                })
            }
            
            const placaVerify = await Veiculo.placaExist(placaUpper)
            if(placaVerify && placaVerify.length > 0){
                return res.status(409).json({
                    message: 'Placa já está em uso'
                }) 
            }

            const newCar = await Veiculo.create(marca,modelo,anoInt,placaUpper,foto,id_usuario,id_tipo)

            res.status(201).json({
                message: 'Veículo criado com sucesso',
                veiculo: {
                    marca,
                    modelo,
                    ano: anoInt,
                    placa: placaUpper
                }
            })

        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    static async update(req,res){
        try{
            const {id} = req.params
            const {placa, foto} = req.body
            const userId = req.user.id

            if(!id || isNaN(id)){
                return res.status(400).json({ 
                    message: 'ID inválido' 
                })
            }

            const carExist = await Veiculo.getOneByUser(id, userId)
            if(!carExist){
                return res.status(404).json({
                    message: 'Veículo não encontrado.'
                })
            }

            if(!placa || placa.trim() === ''){
                return res.status(400).json({
                    message: 'Placa é obrigatória e não pode estar vazia.'
                })
            }

            const placaNormalizada = placa.toUpperCase().replace(/[^A-Z0-9]/g, '')
            
            const placaMudou = carExist.placa !== placaNormalizada

            if(placaMudou){
                const placaRegex = /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/
                if(!placaRegex.test(placaNormalizada)){
                    return res.status(400).json({
                        message: 'Formato de placa inválido. Use o formato ABC1234 ou ABC1D23'
                    })
                }

                const placaEmUso = await Veiculo.placaExist(placaNormalizada)
                if(placaEmUso){
                    return res.status(409).json({
                        message: 'Placa já está em uso por outro veículo'
                    })
                }
            }

            const placaFinal = placaMudou ? placaNormalizada : carExist.placa

            await Veiculo.update(id, placaFinal, foto)

            res.status(200).json({
                message: 'Veículo atualizado com sucesso',
                veiculo: {
                    id: parseInt(id),
                    placa: placaFinal,
                    foto: foto,
                    placaAlterada: placaMudou
                }
            })

        }
         catch (error){
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }
}