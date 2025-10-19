# NoGarimpo - Sistema de Agendamento Automotivo

Sistema completo de gerenciamento e agendamento para serviços automotivos com backend Node.js, MySQL e Docker.

## 🚀 Funcionalidades

- **Gestão de Usuários** - Cadastro e gerenciamento de clientes
- **Gestão de Veículos** - Cadastro com tipos (moto, carro, caminhonete, etc.)
- **Gestão de Serviços** - Catálogo organizado por categorias
- **Sistema de Preços Dinâmico** - Matriz de preços por tipo de veículo
- **Agendamentos Completos** - Múltiplos serviços por agendamento
- **Controle de Status** - Timestamps automáticos de início/fim
- **Categorização** - Organização de serviços por tipo

## 📋 Endpoints da API

### 👥 Usuários
- `GET /user/getUsers` - Listar usuários
- `GET /user/getUser/:id` - Buscar usuário específico
- `POST /user/createUser` - Criar novo usuário

### 🚗 Veículos  
- `GET /car/getCars` - Listar veículos
- `GET /car/getCar/:id` - Buscar veículo específico
- `POST /car/createCar` - Cadastrar veículo
- `DELETE /car/:id` - Remover veículo

### 🛠️ Serviços
- `GET /service/services` - Listar todos os serviços
- `GET /service/services/com-precos?tipo_veiculo_id=X` - Serviços com preços
- `GET /service/services/:id` - Buscar serviço específico

### 🏷️ Categorias
- `GET /category/categories` - Listar categorias
- `GET /category/categories/:id` - Buscar categoria específica

### 🚙 Tipos de Veículo
- `GET /vehicletype/types` - Listar tipos de veículo

### � Preços
- `GET /prices/price?servico_id=X&tipo_veiculo_id=Y` - Consultar preço específico

### 📅 Agendamentos
- `GET /appointment/appointments` - Listar todos os agendamentos
- `GET /appointment/appointments/today` - Agendamentos do dia
- `GET /appointment/appointments/:id` - Buscar agendamento específico
- `POST /appointment/appointments` - Criar novo agendamento
- `PATCH /appointment/appointments/:id` - Atualizar status


## �️ Banco de Dados

- **MySQL 8.0** com suporte UTF-8 completo
- **Estrutura normalizada** com relacionamentos
- **Índices otimizados** para performance
- **Views personalizadas** para consultas complexas

## 🔧 Estrutura do Projeto

```
Project/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── models/         # Modelos de dados
│   │   ├── routes/         # Rotas da API
│   │   └── database/       # Conexão e scripts SQL
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🛡️ Tecnologias

- **Backend:** Node.js + Express
- **Banco:** MySQL 8.0
- **Containerização:** Docker + Docker Compose
- **Arquitetura:** REST API + MVC Pattern
