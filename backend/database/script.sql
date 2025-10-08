
-- Criação da tabela de usuários
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role ENUM('cliente', 'funcionario', 'adm') DEFAULT 'cliente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela de veiculos
CREATE TABLE veiculo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano YEAR NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    foto VARCHAR(255) NULL,
    id_usuario INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Chave estrangeira para usuário
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Criação da tabela de serviços
CREATE TABLE servico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descritivo VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela de agendamentos
CREATE TABLE agendamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_veiculo INT NOT NULL,
    data DATETIME NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    status ENUM('agendado', 'em_andamento', 'concluido', 'cancelado') DEFAULT 'agendado',
    observacoes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Chaves estrangeiras
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id) ON DELETE CASCADE
);

-- Tabela associativa entre agendamento e serviço (muitos para muitos)
CREATE TABLE agendamento_servico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_agendamento INT NOT NULL,
    id_servico INT NOT NULL,
    
    -- Chaves estrangeiras
    FOREIGN KEY (id_agendamento) REFERENCES agendamento(id) ON DELETE CASCADE,
    FOREIGN KEY (id_servico) REFERENCES servico(id) ON DELETE RESTRICT,
    
    -- Evita duplicação do mesmo serviço no mesmo agendamento
    UNIQUE KEY unique_agendamento_servico (id_agendamento, id_servico)
);