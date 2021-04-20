# Rocketseat - Next Level Week 5 - Trilha React JS
Conteúdo aprendido no Next Level Week 5 na trilha sobre o React JS com o Diego Fernandes, iremos usar a metodologia de frontend para criar um site que vai permitir ouvir **podcast**

>Se o seu objetivo está alinhado com o front-end, e você deseja construir interfaces modernas e reativas na web utilizando uma biblioteca modular e escalável, essa trilha é para você

## Aula 01 - Liftoff
>We're go for launch, é hora de decolar e partir rumo ao próximo nível, esse é o começo da nossa missão

Para criar os arquivos excedências iremos usar este comando
```bash
npx create-react-app
```

Depois de criar precisamos excluir alguns arquivos que não vamos precisar deixando somente estes
```bash
node_modules
yarn.lock
package.json
.gitignore
src/App.js
src/index.js
public/index.html
```

Lembramos que o `React JS` não aceita elementos HTML um embaixo de outro sem a uma tag, onde para resolver isso temos a tag fragmento, que é uma tag sem texto
```ts
<>
</>
```

O site será criado com o conceito de `static site generation` com o `Next JS`, assim iremos configurar quando devera ser feito uma nova requisição no backend sendo que as informações são alteradas com uma frequência muito baixa

O comando usado anteriormente criar a aplicação sem o `Next JS` com isso vamos utilizar este para criar uma nova aplicação e refatorar oque for necessário
```bash
npx create-next-app nlw5reactjs
```

## Aula 02 - Maximum Speed
>A decolagem foi um sucesso e agora é hora de avançar com velocidade máxima rumo ao nosso objetivo

Para converter nosso projeto para a linguagem do `TypeScript` precisamos instalar estes itens
```bash
yarn add typescript @types/react @types/node -D
```

Para usar herança no `CSS` vamos usar esta dependência e a extensão passa a ser `.scss`
```bash
yarn add sass
```

O arquivo `_app.tsx` é sempre executado por primeiro, tudo que tem nele é carregado toda vez que uma nova página é aberta e todas as configurações composta nele é passado para as outras páginas

O `Next` não permite edições direta no arquivo `index.html`, para podermos editar algo nele teremos que criar o arquivo `_document.tsx` conforme documentação do `Next` e inserir o desejado, ele vai carregar somente uma vez

Para lidar com datas iremos usar a dependência abaixo
```bash
yarn add date-fns
```

O `Next` possui a métodologia de componentes onde oque pertence a um arquivo vai fazer efeito somente nele como uma estilização do `CSS`, basta colocar a palavra `module` no arquivo

Iremos usar esta dependência para criar um banco de dados a partir de um arquivo `json`, por isso ele será utilizado somente no desenvolvimento
```bash
yarn add json-server -D
```

Para executar o banco de dados vamos utilizar o atalho abaixo com algumas opções extra
```ts
// -w faz ele reiniciar quando tiver alterações
// -d cria um atraso de processamento
// -p define a porta de funcionamento

"server": "json-server server.json -w -d 750 -p 3333"
```

Para criar uma configuração `SPA` basta introduzir os comandos normalmente onde os comandos executado pelo navegador é feito depois que a página iniciar, do tipo `SSR` temos que criar uma exportação da de uma função com o nome de `getServerSideProps` em uma das páginas por fora de tudo pois assim tudo que estiver dentro dela vai ser executado pelo servidor do `Next` e no tipo `SSG` também temos que criar uma função como antes mais com o nome de `getStaticProps` assim conseguimos definir quando uma nova requisição deve ser feito a partir do comando `revalidate`
