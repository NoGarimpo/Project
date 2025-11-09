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
    data_termino_estimada DATETIME NOT NULL,
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
CREATE INDEX idx_agendamentos_data_termino ON agendamentos(data_termino_estimada);
CREATE INDEX idx_agendamentos_status ON agendamentos(status);
CREATE INDEX idx_veiculos_usuario ON veiculos(id_usuario);
CREATE INDEX idx_veiculos_tipo ON veiculos(id_tipo_veiculo);
CREATE INDEX idx_servicos_categoria ON servicos(id_categoria);
CREATE INDEX idx_preco_servicos_servico ON preco_servicos(id_servico);
CREATE INDEX idx_preco_servicos_tipo_veiculo ON preco_servicos(id_tipo_veiculo);


-- Categorias
INSERT INTO categorias (nome, descricao) VALUES
('Lavagem', 'Serviços de limpeza e lavagem automotiva'),
('Polimento', 'Serviços de polimento e correção de pintura'),
('Vitrificação', 'Proteção cerâmica avançada'),
('Pintura', 'Serviços especializados de pintura'),
('Pacotes', 'Pacotes completos de serviços');

-- Tipos de Veículo
INSERT INTO tipos_veiculo (nome, descricao) VALUES
('Moto', 'Motocicletas em geral'),
('Carro', 'Carros de passeio em geral'),
('Caminhonete', 'Picapes e caminhonetes'),
('SUV', 'Carros maiores');

-- Serviços reais da estética
INSERT INTO servicos (id_categoria, nome, descricao) VALUES
-- Lavagem
(1, 'Lavagem Simples', 'Lavagem externa básica'),
(1, 'Lavagem Completa', 'Lavagem completa externa e interna'),
(1, 'Lavagem Detalhada', 'Lavagem detalhada deixando o veiculo na risca'),

-- Polimento
(2, 'Polimento Comercial', 'Polimento básico para veículos comerciais'),
(2, 'Polimento Técnico', 'Polimento técnico profissional completo'),
(2, 'Polimento de Farol', 'Restauração e polimento de faróis'),

-- Vitrificação 
(3, 'Vitrificação', 'Proteção cerâmica premium completa'),

-- Pintura
(4, 'Pintura de Roda', 'Pintura especializada de rodas'),

-- Pacotes
(5, 'Pacote Ruby', 'Pacote completo com todos os serviços da estética: lavagem detalhada + polimento técnico + vitrificação + extras');

-- Matriz de preços dos serviços reais
INSERT INTO preco_servicos (id_servico, id_tipo_veiculo, preco, duracao_minutos) VALUES

-- Lavagem Simples
(1, 1, 60.00, 30),    -- Moto
(1, 2, 100.00, 40),   -- Carro
(1, 3, 150.00, 180),   -- Caminhonete
(1, 4, 145.00, 175),   -- SUV

-- Lavagem Completa
(2, 1, 150.00, 75),   -- Moto (menor)
(2, 2, 200.00, 90),   -- Carro
(2, 3, 400.00, 360),  -- Caminhonete
(2, 4, 390.00, 355),  -- SUV

-- Lavagem Detalhada
(3, 1, 350.00, 150),  -- Moto (menor)
(3, 2, 450.00, 180),  -- Carro
(3, 3, 800.00, 480),  -- Caminhonete
(3, 4, 790.00, 475),  -- SUV

-- Polimento Comercial
(4, 1, 300.00, 2880), -- Moto
(4, 2, 400.00, 2880), -- Carro
(4, 3, 500.00, 4320), -- Caminhonete
(4, 4, 495.00, 4290), -- SUV

-- Polimento Técnico
(5, 1, 900.00, 5760),  -- Moto
(5, 2, 1200.00, 5760), -- Carro
(5, 3, 1300.00, 7200), -- Caminhonete
(5, 4, 1290.00, 7170), -- SUV

-- Polimento de Farol
(6, 1, 120.00, 60),   -- Moto (menor)
(6, 2, 150.00, 90),   -- Carro
(6, 3, 180.00, 120),  -- Caminhonete
(6, 4, 175.00, 115),  -- SUV

-- Vitrificação
(7, 1, 800.00, 480),  -- Moto
(7, 2, 1200.00, 720), -- Carro
(7, 3, 1500.00, 900), -- Caminhonete
(7, 4, 1480.00, 890), -- SUV

-- Pintura de Roda
(8, 1, 300.00, 2880), -- Moto
(8, 2, 500.00, 2880), -- Carro
(8, 3, 600.00, 2880), -- Caminhonete
(8, 4, 590.00, 2880), -- SUV

-- Pacote Ruby (Completo: lavagem + polimento + vitrificação + extras)
(9, 1, 1500.00, 5760),  -- Moto
(9, 2, 2000.00, 10080), -- Carro
(9, 3, 3500.00, 14400), -- Caminhonete
(9, 4, 3400.00, 14100); -- SUV

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
    a.data_termino_estimada,
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