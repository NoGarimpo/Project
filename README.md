# Projeto NoGarimpo

Sistema de gerenciamento de veículos com backend Node.js e MySQL.

**Pré-requisitos:** Apenas Docker e Docker Compose

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd Project
   ```

2. **Execute uma das opções:**
   
   **Opção 1 (tudo em um comando):**
   ```bash
   docker-compose up --build
   ```
   
   **Opção 2 (dois passos):**
   ```bash
   docker-compose build
   docker-compose up
   ```

3. **Pronto!** 
   - API: `http://localhost:8000`
   - MySQL: `localhost:3306`
   - Banco criado automaticamente
   - Tabelas criadas automaticamente

##  Endpoints da API

### Veículos
- `GET /car/getCars` - Listar todos os veículos
- `GET /car/getCar/:id` - Buscar veículo por ID
- `DELETE /car/:id` - Deletar veículo

### Usuários
- `GET /user/getUsers` - Listar todos os usuários
- `GET /user/getUser/x` - Lista usuario especifico
- `POST /user/createUser` - Cria usuário

## 🐳 Docker

**Opções para executar:**

**Tudo em um comando:**
```bash
docker-compose up --build
```

**Ou em dois passos:**
```bash
docker-compose build    # Constrói as imagens
docker-compose up       # Sobe os containers
```

**Para parar:**
```bash
docker-compose down
```

## 🔧 Estrutura do Projeto

```
backend/
├── controllers/     # Controladores da API
├── database/        # Conexão e scripts do banco
├── models/          # Modelos de dados
├── routes/          # Rotas da API
└── index.js         # Arquivo principal
```