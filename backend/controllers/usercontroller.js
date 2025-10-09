import { connection } from '../database/conn.js'
import { User } from '../models/user.js'
import bcrypt from 'bcryptjs'

export default class userController{
    static async getAll(req,res){
        try{
            const users = await User.findAll()
            if(!users || users.length === 0){
                return res.status(404).json({message: 'Nenhum usuário encontrado'})
            }
            res.json(users)
        }
        catch(error){
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }
    
    static async getOne(req,res){
        try{
            const { id } = req.params
            
            if(!id || isNaN(id)){
                return res.status(400).json({ 
                    error: 'ID inválido' 
                })
            }
            
            const user = await User.findOne(id)
            
            if(!user){
                return res.status(404).json({ 
                    message: `Usuário com ID ${id} não encontrado` 
                })
            }
            
            res.json(user)
            
        } catch(error){
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }
    static async create(req,res){
        try{
            const {nome, email, senha} = req.body
            
            if(!nome || !email || !senha){
                return res.status(400).json({
                    error: 'Por favor preencha todos os campos.'
                })
            }
            
            if(senha.length < 6){
                return res.status(400).json({
                    error: 'Senha deve ter pelo menos 6 caracteres'
                })
            }
            
            const saltRounds = 12 //quantidade de caracteres
            const hashedPassword = await bcrypt.hash(senha, saltRounds)
            
            const newUser = await User.create(nome, email, hashedPassword)
            
            res.status(201).json({
                message: 'Usuário criado com sucesso',
                user: {
                    id: newUser.insertId,
                    nome,
                    email
                }
            })
            
        } catch(error){
            
            if(error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    error: 'Email já está em uso'
                })
            }
            
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }
}