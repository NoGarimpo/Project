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

CREATE TABLE marcas_veiculo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(80) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE modelos_veiculo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(80) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    id_marca_veiculo INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_marca_veiculo) REFERENCES marcas_veiculo(id) ON DELETE RESTRICT,
    UNIQUE KEY unique_modelo_marca (modelo, id_marca_veiculo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(70) NULL,
    modelo VARCHAR(50) NULL,
    ano YEAR NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    foto VARCHAR(255) NULL,
    id_marca_veiculo INT NULL,
    id_modelo_veiculo INT NULL,
    id_tipo_veiculo INT NOT NULL,
    id_usuario INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_tipo_veiculo) REFERENCES tipos_veiculo(id) ON DELETE RESTRICT,
    FOREIGN KEY (id_modelo_veiculo) REFERENCES modelos_veiculo(id) ON DELETE SET NULL,
    FOREIGN KEY (id_marca_veiculo) REFERENCES marcas_veiculo(id) ON DELETE SET NULL,
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

-- Marcas de Veículo mais populares no Brasil (para selects do frontend)
INSERT INTO marcas_veiculo (marca) VALUES
('Chevrolet'),
('Volkswagen'),
('Ford'),
('Fiat'),
('Renault'),
('Toyota'),
('Honda'),
('Hyundai'),
('Nissan'),
('Peugeot'),
('Citroën'),
('BMW'),
('Mercedes-Benz'),
('Audi'),
('Volvo'),
('Jeep'),
('Mitsubishi'),
('Suzuki'),
('Yamaha'),
('Kawasaki'),
('Ducati'),
('Harley-Davidson'),
('KTM'),
('Triumph'),
('Porsche'),
('Land Rover'),
('Jaguar'),
('Lexus'),
('Infiniti'),
('Subaru'),
('Mazda'),
('Chery'),
('JAC'),
('Caoa'),
('RAM');

INSERT INTO modelos_veiculo (modelo, id_marca_veiculo) VALUES
-- Chevrolet
('Onix', 1),
('Onix Plus', 1),
('Prisma', 1),
('Cruze', 1),
('Corsa', 1),
('Astra', 1),
('Tracker', 1),
('Equinox', 1),
('S10', 1),
('Spin', 1),
('Cobalt', 1),

-- Volkswagen
('Gol', 2),
('Polo', 2),
('Virtus', 2),
('Jetta', 2),
('T-Cross', 2),
('Tiguan', 2),
('Amarok', 2),
('Saveiro', 2),
('Fox', 2),
('Up', 2),

-- Ford
('Ka', 3),
('Ka Sedan', 3),
('Fiesta', 3),
('Focus', 3),
('EcoSport', 3),
('Ranger', 3),
('Territory', 3),
('Edge', 3),

-- Fiat
('Uno', 4),
('Argo', 4),
('Cronos', 4),
('Mobi', 4),
('Toro', 4),
('Strada', 4),
('Pulse', 4),
('Fastback', 4),
('Fiorino', 4),

-- Renault
('Sandero', 5),
('Logan', 5),
('Duster', 5),
('Captur', 5),
('Kwid', 5),
('Oroch', 5),
('Stepway', 5),

-- Toyota
('Corolla', 6),
('Yaris', 6),
('Etios', 6),
('RAV4', 6),
('Hilux', 6),
('SW4', 6),
('Camry', 6),
('Prius', 6),

-- Honda
('Civic', 7),
('City', 7),
('Fit', 7),
('HR-V', 7),
('CR-V', 7),
('WR-V', 7),
('Accord', 7),

-- Hyundai
('HB20', 8),
('HB20S', 8),
('Creta', 8),
('Tucson', 8),
('ix35', 8),
('Azera', 8),
('Elantra', 8),
('Santa Fe', 8),

-- Nissan
('March', 9),
('Versa', 9),
('Kicks', 9),
('Sentra', 9),
('Frontier', 9),
('Livina', 9),
('X-Trail', 9),

-- Peugeot
('208', 10),
('2008', 10),
('3008', 10),
('5008', 10),
('Partner', 10),
('Expert', 10),

-- Citroën
('C3', 11),
('C4 Cactus', 11),
('Aircross', 11),
('Berlingo', 11),
('Jumper', 11),

-- BMW
('Série 1', 12),
('Série 3', 12),
('Série 5', 12),
('X1', 12),
('X3', 12),
('X5', 12),
('320i', 12),

-- Mercedes-Benz
('Classe A', 13),
('Classe C', 13),
('Classe E', 13),
('GLA', 13),
('GLC', 13),
('GLE', 13),
('Sprinter', 13),

-- Audi
('A3', 14),
('A4', 14),
('A6', 14),
('Q3', 14),
('Q5', 14),
('Q7', 14),

-- Volvo
('XC40', 15),
('XC60', 15),
('XC90', 15),
('S60', 15),
('V40', 15),

-- Jeep
('Renegade', 16),
('Compass', 16),
('Commander', 16),
('Grand Cherokee', 16),
('Wrangler', 16),

-- Mitsubishi
('Lancer', 17),
('ASX', 17),
('Outlander', 17),
('Pajero', 17),
('L200', 17),

-- Suzuki
('Swift', 18),
('Vitara', 18),
('S-Cross', 18),
('Jimny', 18),

-- Yamaha
('YZF-R1', 19),
('YZF-R6', 19),
('MT-07', 19),
('MT-09', 19),
('Fazer 250', 19),
('XTZ 250', 19),
('NMAX 160', 19),
('Neo 125', 19),

-- Kawasaki
('Ninja 300', 20),
('Ninja 400', 20),
('Ninja ZX-10R', 20),
('Z400', 20),
('Versys 650', 20),
('Vulcan 900', 20),

-- Ducati
('Panigale V4', 21),
('Monster 821', 21),
('Scrambler', 21),
('Multistrada', 21),
('Diavel', 21),

-- Harley-Davidson
('Street 750', 22),
('Iron 883', 22),
('Fat Boy', 22),
('Road King', 22),
('Softail', 22),

-- KTM
('390 Duke', 23),
('690 Duke', 23),
('1290 Super Adventure', 23),
('RC 390', 23),

-- Triumph
('Street Triple', 24),
('Speed Triple', 24),
('Tiger 800', 24),
('Bonneville', 24),

-- Porsche
('911', 25),
('Cayenne', 25),
('Macan', 25),
('Panamera', 25),
('Boxster', 25),
('Cayman', 25),

-- Land Rover
('Discovery', 26),
('Range Rover', 26),
('Defender', 26),
('Evoque', 26),
('Velar', 26),

-- Jaguar
('XE', 27),
('XF', 27),
('F-Pace', 27),
('E-Pace', 27),
('I-Pace', 27),

-- Lexus
('IS', 28),
('ES', 28),
('RX', 28),
('NX', 28),

-- Mazda
('Mazda3', 31),
('CX-5', 31),
('CX-30', 31),
('MX-5', 31),

-- Chery
('Tiggo 2', 32),
('Tiggo 5X', 32),
('Tiggo 7', 32),
('Arrizo 5', 32),

-- JAC
('J2', 33),
('J3', 33),
('T40', 33),
('iEV40', 33),

-- RAM
('2500', 35),
('1500', 35),
('ProMaster', 35);

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