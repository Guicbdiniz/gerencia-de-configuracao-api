# Gerência de Configuração e Evolução de Software

Esse é o código atualizado para a Students API.

## Tecnologias

API escrita em Typescript, utilizando o framework ExpressJS para implementação de rotas e a biblioteca Celebrate para validação de dados.

## Estrutura

- __src:__ Pasta contendo arquivos de código fonte da aplicação
  - __controllers:__ Pasta contendo os controladores da aplicação, definindo métodos que serão utilizados nas rotas
  - __db:__ Definição simples de um database temporário utilizando o *singleton pattern*
  - __types:__ Pasta contendo definição de tipos da aplicação
  - __routes:__ Definição das rotas da api
  - __server:__ Definição do servidor da aplicação
- __tests:__ Pasta contendo testes da aplicação

## Setup

Para execução da aplicação é necessário ter o `NodeJS` instalado, seja por meio do [site oficial](https://nodejs.org/en/) ou por meio de um gestor de versões como o [NVM](https://github.com/nvm-sh/nvm)  

Após ter o `NodeJS` instalado, rode o seguinte comando para instalar as dependências da aplicação.

```bash
  npm install
```

Duplique o arquivo `.env.example` e de o nome de `.env`. Nele, coloque as variáveis de ambiente conforme definidas no exemplo.

## Modo de desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento, basta fazer a seguinte modificação no `.env`

```env
  NODE_ENV=development
```

E executar o seguinte comando

```bash
  npm run dev
```

A aplicação deverá iniciar na porta especificada no arquivo `.env`

## Modo de produção

Para iniciar a aplicação em modo de produção, primeiro deve ser feita a seguinte modificação no `.env`

```env
  NODE_ENV=production
```

Após isso a aplicação deve ser compilada, a afim de obtermos uma versão em Javascript puro. Isso pode ser realizado por meio do seguinte comando

```bash
  npm run build
```

Por fim, basta executar o seguinte comando para iniciar a aplicação

```bash
  npm start
```

A aplicação deverá iniciar na porta especificada no arquivo `.env`

## Rodando testes

Para executar os testes, basta rodar o seguinte comando

```bash
  npm run test
```

## Autor

- Aylton Almeida
