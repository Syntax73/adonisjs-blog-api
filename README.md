# Api de blog feita com AdonisJs

Back-end feita com NodeJs, AdonisJs, Javascript e usando [TDD (Test Driven Development)](https://www.devmedia.com.br/test-driven-development-tdd-simples-e-pratico/18533)

## Setup

Primeiro instale o AdonisJs CLI de forma global.

> Em sistemas linux você deve rodar o comando como usuario root, use `sudo` antes do comando.

Use o comando:

```bash
npm i -g @adonisjs/cli
```

Clone o projeto e depois instale as dependências:

> Você pode usar npm, basta usar o comando: `npm install`.

```bash
git clone https://github.com/Syntax73/adonisjs-blog-api.git
cd adonisjs-blog-api
yarn install
```

Depois crie o arquivo com as variáves ambiente:

> Use o arquivo `.env.example` como base.

```bash
touch .env
```

Edite as variáves para a sua necessidade:

```
DB_CONNECTION=pg      // Adonis aceita estas opções (sqlite3, mysql, pg)
DB_HOST=127.0.0.1     // Host do banco
DB_PORT=5432          // A porta usada no banco
DB_USER=root          // Usuario com acesso
DB_PASSWORD=123456    // Senha do usuario
DB_DATABASE=adonis    // Nome do banco
```

Você tambem pode editar as variaveis ambiente do arquivo `.env.testing`, neste arquivo ficam as variaveis de ambiente
usadas nos testes.

> Nele escolhi usar o banco sqlite.

Depois use o comando para gerar a chave da aplicação:

> Esta chave é usada para gerar tokens JWT.

```bash
adonis key:generate
```

### Migrations

Primeiro crie um banco de dados com o nome que você indicou no arquivo `.env`.

> Documentação sobre [migrations](https://adonisjs.com/docs/4.1/migrations).

Depois rode as migrations:

```bash
adonis migration:run
```

Tambem use o comando:

> Esse comando irá popular o banco com dados fictícios. Documentação sobre [seed](https://adonisjs.com/docs/4.1/seeds-and-factories).

```bash
adonis seed
```

### TDD

Você deve agora criar uma pasta na raiz do projeto chamada `tmp`, dentro dela terá uma pasta chamda `uploads`, ela
receberá as tumbnails que seram enviadas, outra pasta que deve ser criada dentro de `tmp` e `test`, nela você deve
colocar uma imagem que vai ser usada nos testes, ela deve sé chamar thumb. Com isso o diretorio deve ficar assim:

```
tmp/test/thumb.jpg
tmp/uploads/
```

Agora você já pode rodar os testes da aplicação, para isso basta usar o comando abaixo:

> Você pode usar npm, basta usar o comando: `npm test`.

```bash
yarn test
```

Caso os todos os testes passem, a aplicação estará funcionando como esperado.

### Servidor

A aplicação não tem rota de cadastro, então é importante que você use o comando `adonis seed` para rodarem os seeds.
Agora quando for usar a rota de `/sessions`, basta usar o email: **admin@adm.com** e a senha: **qwe123**.

Depois basta iniciar o servidor:

Desenvolvimento:

```bash
adonis serve --dev
```

Produção:

> Você pode usar npm, basta usar o comando: `npm start`

```bash
yarn start
```
