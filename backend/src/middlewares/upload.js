import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuração do storage do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads/cars')
        
        // Criar diretório se não existir
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }
        
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        // Gerar nome único para o arquivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname)
        cb(null, 'car-' + uniqueSuffix + extension)
    }
})

// Filtro para validar tipos de arquivo
const fileFilter = (req, file, cb) => {
    // Tipos de imagem permitidos
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Tipo de arquivo não permitido. Use apenas JPEG, PNG, GIF ou WebP.'), false)
    }
}

// Configuração do multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB máximo
    },
    fileFilter: fileFilter
})

// Middleware para upload de uma única imagem
export const uploadCarImage = upload.single('foto')

// Middleware para tratamento de erros do multer
export const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'Arquivo muito grande. Tamanho máximo permitido: 5MB'
            })
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                message: 'Campo de arquivo inesperado. Use o campo "foto"'
            })
        }
    }
    
    if (error.message.includes('Tipo de arquivo não permitido')) {
        return res.status(400).json({
            message: error.message
        })
    }
    
    next(error)
}

// Função para deletar arquivo antigo
export const deleteOldImage = (imagePath) => {
    if (imagePath) {
        const fullPath = path.join(__dirname, '../../uploads/cars', path.basename(imagePath))
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath)
        }
    }
}

export default { uploadCarImage, handleUploadError, deleteOldImage }