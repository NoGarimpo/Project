import { Category } from "../models/category.js";

export default class categoryController{
    static async getAll(req,res){
        try{
            const rows = await Category.getAll()
            if(!rows){
                res.status(404).json({
                    message:'nenhuma categoria encontrada'
                })
            }
            return res.json(rows)
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
            const data = await Category.getOne(id)

            if(!data || data.length === 0){
                return res.status(404).json({
                    message: 'categoria não encontrada'
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
            const {nome,descricao} = req.body

            if(!nome || !descricao){
                return res.status(400).json({
                    message: 'Por favor preencha todos os campos.'
                })
            }

            if(nome.trim() === '' || descricao.trim() === ''){
                return res.status(400).json({
                    message: 'Digite corretamente os campos'
                })
            }

            const newCategory = await Category.create(nome,descricao)
            
            res.status(201).json({
                message: 'Categoria criada com sucesso',
                user: {
                    nome,
                    descricao
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
                const {ativo} = req.body

                if(!id || isNaN(id)){
                return res.status(400).json({
                        message: 'ID inválido.'
                    })
                }

                const category = await Category.getOne(id)

                if(!category || category.length === 0){
                    return res.status(404).json({
                        message: 'Categoria não encontrada'
                    })
                }

                const categoryUpdated = await Category.update(id,ativo)

                return res.status(200).json({
                    message: `boa`,
                    categoria: {
                        ativo
                    }
                })
        } 
        catch(error){
            res.status(500).json({ message: 'Erro interno no servidor' })
        }
    }
}