-- Garantir que o banco use UTF-8
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role ENUM('cliente', 'funcionario', 'adm') DEFAULT 'cliente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tipos_veiculo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano YEAR NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    foto VARCHAR(255) NULL,
    id_tipo_veiculo INT NOT NULL,
    id_usuario INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_tipo_veiculo) REFERENCES tipos_veiculo(id) ON DELETE RESTRICT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE servicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_categoria) REFERENCES categorias(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE preco_servicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_servico INT NOT NULL,
    id_tipo_veiculo INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    duracao_minutos INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_servico) REFERENCES servicos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo_veiculo) REFERENCES tipos_veiculo(id) ON DELETE RESTRICT,
    
    UNIQUE KEY unique_servico_tipo_veiculo (id_servico, id_tipo_veiculo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE agendamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_veiculo INT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    preco_total DECIMAL(10,2) NOT NULL,
    duracao_total_minutos INT NOT NULL,
    status ENUM('agendado', 'em_andamento', 'concluido', 'cancelado') DEFAULT 'agendado',
    observacoes TEXT NULL,
    iniciado_em TIMESTAMP NULL,
    finalizado_em TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_veiculo) REFERENCES veiculos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE agendamento_servicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_agendamento INT NOT NULL,
    id_preco_servico INT NOT NULL,
    
    FOREIGN KEY (id_agendamento) REFERENCES agendamentos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_preco_servico) REFERENCES preco_servicos(id) ON DELETE RESTRICT,
    
    UNIQUE KEY unique_agendamento_servico (id_agendamento, id_preco_servico)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_agendamentos_data ON agendamentos(data_agendamento);
CREATE INDEX idx_agendamentos_status ON agendamentos(status);
CREATE INDEX idx_veiculos_usuario ON veiculos(id_usuario);
CREATE INDEX idx_veiculos_tipo ON veiculos(id_tipo_veiculo);
CREATE INDEX idx_servicos_categoria ON servicos(id_categoria);
CREATE INDEX idx_preco_servicos_servico ON preco_servicos(id_servico);
CREATE INDEX idx_preco_servicos_tipo_veiculo ON preco_servicos(id_tipo_veiculo);


-- Categorias
INSERT INTO categorias (nome, descricao) VALUES
('Limpeza e Higienização', 'Serviços de limpeza completa e higienização'),
('Polimento', 'Serviços de polimento e recuperação da pintura'),
('Vitrificação', 'Proteção avançada da pintura'),
('Detalhamento', 'Serviços completos de detalhamento automotivo'),
('Proteção', 'Serviços de proteção e conservação');

-- Tipos de Veículo
INSERT INTO tipos_veiculo (nome, descricao) VALUES
('Moto', 'Motocicletas em geral'),
('Carro', 'Carros de passeio em geral'),
('Caminhonete', 'Picapes e caminhonetes'),
('Van', 'Vans e utilitários'),
('Caminhão', 'Caminhões e veículos pesados');

-- Serviços de exemplo
INSERT INTO servicos (id_categoria, nome, descricao) VALUES
(1, 'Lavagem Técnica Simples', 'Lavagem externa com shampoo automotivo'),
(1, 'Lavagem Técnica Detalhada', 'Lavagem completa externa e interna'),
(1, 'Higienização Completa', 'Limpeza profunda de estofados e carpetes'),
(2, 'Polimento Técnico', 'Polimento para remoção de riscos leves'),
(2, 'Polimento Pesado', 'Polimento para correção de pintura'),
(3, 'Vitrificação Básica', 'Proteção cerâmica básica'),
(3, 'Vitrificação Premium', 'Proteção cerâmica premium com garantia estendida');

-- Matriz de preços (exemplo para alguns serviços)
INSERT INTO preco_servicos (id_servico, id_tipo_veiculo, preco, duracao_minutos) VALUES
-- Lavagem Técnica Simples
(1, 1, 25.00, 30),   -- Moto
(1, 2, 40.00, 60),   -- Carro
(1, 3, 60.00, 90),   -- Caminhonete
(1, 4, 70.00, 105),  -- Van
(1, 5, 100.00, 150), -- Caminhão

-- Lavagem Técnica Detalhada
(2, 1, 45.00, 60),   -- Moto
(2, 2, 70.00, 120),  -- Carro
(2, 3, 100.00, 180), -- Caminhonete
(2, 4, 120.00, 210), -- Van
(2, 5, 180.00, 300), -- Caminhão

-- Polimento Técnico
(4, 1, 80.00, 90),   -- Moto
(4, 2, 150.00, 180), -- Carro
(4, 3, 220.00, 270), -- Caminhonete
(4, 4, 280.00, 330), -- Van
(4, 5, 400.00, 480); -- Caminhão

-- View para facilitar consulta de preços
CREATE VIEW view_precos_servicos AS
SELECT 
    s.id as id_servico,
    s.nome as nome_servico,
    c.nome as nome_categoria,
    tv.nome as nome_tipo_veiculo,
    ps.preco,
    ps.duracao_minutos,
    ps.ativo
FROM servicos s
JOIN categorias c ON s.id_categoria = c.id
JOIN preco_servicos ps ON s.id = ps.id_servico
JOIN tipos_veiculo tv ON ps.id_tipo_veiculo = tv.id
WHERE s.ativo = TRUE AND ps.ativo = TRUE
ORDER BY c.nome, s.nome, tv.id;

-- View para agenda diária dos funcionários
CREATE VIEW view_agenda_diaria AS
SELECT 
    a.id as id_agendamento,
    a.data_agendamento,
    a.status,
    u.nome as nome_cliente,
    v.marca,
    v.modelo,
    v.placa,
    GROUP_CONCAT(s.nome ORDER BY c.nome, s.nome SEPARATOR ', ') as servicos,
    a.duracao_total_minutos,
    a.preco_total,
    a.observacoes
FROM agendamentos a
JOIN usuarios u ON a.id_usuario = u.id
JOIN veiculos v ON a.id_veiculo = v.id
JOIN agendamento_servicos ash ON a.id = ash.id_agendamento
JOIN preco_servicos ps ON ash.id_preco_servico = ps.id
JOIN servicos s ON ps.id_servico = s.id
JOIN categorias c ON s.id_categoria = c.id
WHERE DATE(a.data_agendamento) = CURDATE()
GROUP BY a.id
ORDER BY a.data_agendamento;