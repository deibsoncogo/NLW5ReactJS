# Rocketseat - Next Level Week 5 - Trilha React JS
Conteúdo aprendido no Next Level Week 5 na trilha sobre o React JS com o Diego Fernandes, onde criamos frontend para ouvir alguns **podcast** da Rocketseat

## Backend
Foi criado uma API fake para funcionar online ou local, com o [My JSON Server](https://my-json-server.typicode.com/) criamos uma API para funcionamento online e para rodar de forma local você vai precisar executar estes comandos
```ts
// para instalar todos as dependências
yarn

// atalho para executar o banco de dados local
yarn server

// oque tem dentro do atalho acima
//   -w faz ele reiniciar quando tiver alterações
//   -d cria um atraso de processamento
//   -p define a porta de funcionamento
json-server db.json -w -d 750 -p 3333
```

## Frontend
Para executar o basta seguir esta instrução depois dos comandos do **backend**
```ts
// para executar o frontend
yarn dev
```

## Ferramentas e dependências utilizado
As ferramentas utilizadas foram: `Yarn`, `Node JS`, `React JS`, `Next JS` e `TypeScript`

As dependências utilizadas foram: `axios`, `date-fns`, `rc-slider` e `sass`

Dependências usadas em modo de desenvolvimento: `eslint` e `json-server`

## Imagens
![Tela principal com o tema dark](/src/assets/print1.png)


![Tela de detalhamento od episódio com o tema dark](/src/assets/print2.png)


![Tela principal com um podcast tocando com o tema dark](/src/assets/print3.png)


![Tela principal com um podcast tocando com o tema clear](/src/assets/print4.png)
