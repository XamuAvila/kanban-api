# Kanban-api

## Configurando Localmente

```
npm install
npm run db:create  - E aceitar quaisquer alterações que o console pedir
npm run db:seed - Criar o usuário no .env

npm run start para rodar em produção
npm run start:dev para rodar em modo de desenvolvimento

```

## Docker
```
    docker-compose up -d
    vai estar exposto na porta 5000 porém tem um erro no bcrypt que não está deixando o projeto terminar o build
```
