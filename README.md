# Aplicação Full Stack

Esta aplicação gerencia as notas de alunos e possui todas as operações de CRUD.

## Como rodar na sua máquina

No seu diretório de preferência, digite o comando:
```sh
git clone
```

### Back end

Antes de tudo, é necessário ter uma conta no [MongoDB Atlas](https://cloud.mongodb.com/);

Agora instale todas as dependências:
```
cd grades-api
npm install ou yarn
```

Antes de rodar o back end, na raiz do projeto crie um arquivo `.env` e no campo `MONGODB` insira sua string de coneção com o MongoDB. Não é obrigatório escolher uma porta de conexão no campo `PORT`.

Digite o comando para rodar a aplicação:
```
npm run start ou yarn start
```

### Front end

Digite os seguintes comandos para rodar o front end:
```
cd grades-ui
npm install ou yarn
npm run start ou yarn start
```

Trabalho desenvolvido por [Lucas Batista](https://github.com/lucasbaquinoo), [Jonas Martins](https://github.com/Jonas-Martins) e [João Shinkai](https://github.com/JoaoShinkai).