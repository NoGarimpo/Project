import jwt from 'jsonwebtoken'

const authenticate = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : authHeader

    if(!token) return res.status(403).json({ message: 'Token não fornecido' })
    
    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if(err) return res.status(403).json({ message: 'Token inválido' })
        req.user = user
        next()
    })
}

export default authenticate