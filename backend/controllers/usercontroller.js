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
    static async update(req,res){
        try {
            const {id} = req.params
            const {nome, email, senha} = req.body
            
            if(!nome || !email){
                return res.status(400).json({
                    error: 'Nome e email são obrigatórios.'
                })
            }

            if(!id || isNaN(id)){
                return res.status(400).json({ 
                    error: 'ID inválido' 
                })
            }

            const userExist = await User.findOne(id)
            if(!userExist){
                return res.status(404).json({
                    message: `Usuário com ID ${id} não encontrado`
                })
            }

            const emailVerify = await User.emailexist(email)
            if(emailVerify.length > 0 && emailVerify[0].id != id){
                return res.status(409).json({
                    error: 'Email já está em uso por outro usuário'
                })
            }

            let finalPassword = userExist.senha
            
            if(senha && senha.trim() !== ''){
                const isSamePassword = await bcrypt.compare(senha, userExist.senha)
                
                if(!isSamePassword){
                    if(senha.length < 6){
                        return res.status(400).json({
                            error: 'Senha deve ter pelo menos 6 caracteres'
                        })
                    }
                    
                    const saltRounds = 12
                    finalPassword = await bcrypt.hash(senha, saltRounds)
                }
            }
 
            const updatedUser = await User.update(id, nome, email, finalPassword)

            res.json({
                message: 'Usuário atualizado com sucesso',
                user: {
                    nome,
                    email
                }
            })

        } catch (error) {
            console.error('Erro no update:', error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }
    
}