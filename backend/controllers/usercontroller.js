import { connection } from '../database/conn.js'
import { User } from '../models/user.js'

export default class userController{
    static async getAll(req,res){
        try{
            const users = await User.findAll()
            res.json(users)
        }
        catch{
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }
}