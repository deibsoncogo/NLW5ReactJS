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
