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

## Aula 03 - In orbit
>Estamos em órbita, explorando um universo infinito, repleto de novos conhecimentos

Para criar a tipagem da função que cuida do `SSR` ou `SSG` vamos precisar realizar uma importação com o nome parecido da função, oque muda é a primeira letra pois ela é em maiúscula, e depois realizar estas mudanças
```ts
import { GetStaticProps } from "next";

export async function getStaticProps() {} // sem a tipagem
export const getStaticProps: GetStaticProps = async () => {} // com a tipagem
```

Para lidar melhor com as requisições do servidor iremos usar a dependência abaixo, assim conseguimos criar limitações num formato semântico
```bash
yarn add axios
```

É extramente importante já receber os dados formatado no frontend pois assim iremos evitar processamentos extras, esse processamento em computadores mais lento pode gerar conflitos, caso elas não venham corretamente temos que fazer isso no recebimentos deles

O `Next` também consegue lidar com alguns tipos de dados como imagens, para realizar isso precisamos a importação abaixo, criar uma configuração no arquivo `next.config.js` falando onde as imagens estão salvas, trocando a `img` por `Image` e personalizar oque precisar
```ts
import Image from "next/image";

<Image
  width={192} // define a largura a baixar do servidor
  height={192} // define a altura a baixar do servidor
  objectFit="cover" // como a imagem deve se ajustar
  src={m.thumbnail} // nativo do img informando qual imagem carregar
  alt={m.title} // nativo do img informando oque mostrar se não carregar a imagem
/>
```

O `Next` consegue lidar com rotas assim criando elas automaticamente onde o caminho será o nome do arquivo contido na pasta `pages` que não começa com `_`, existe uma técnica de nomear o arquivo onde assim a rota se tornar dinâmica, para isso basta usar `[]` onde precisa ser dinâmico

O `Next` também possui uma funcionalidade de carregar somente os itens diferente quando trocar de página, para utilizar bastas realizar esta importação e mudar o link para essa tag invés de um `a`
```ts
import Link from "next/link";

<Link href={`/episode/${episode.id}`}>
  <a>{episode.title}</a>
</Link>
```

Se recebemos por exemplo uma descrição que contenha comandos html dentro dela o sistema vai considerar como texto e não comandos, para força ele a executar precisamos usar o `dangerouslySetInnerHTML` informando o local da informação desejado
```ts
<div
  className={style.description}
  dangerouslySetInnerHTML={{ __html: episode.description }}
/>
```

## Aula 04 - Landing
>É hora de pousar em um novo planeta

Ao rodar a build (Criar a versão estável da nossa aplicação) o `Next JS` vai criar todas as páginas de forma **estática** conforme nos configuramos, pois o tempo definido começa a contar neste momento, para as página estáticas isso não gera nenhum problema

Para não termos problemas na versão estável com as **páginas dinâmicas** teremos que criar a função `getStaticPaths` dentro da página, assim conseguimos definir quais páginas devem ser geradas em `paths` e falar oque fazer com as não geradas em `fallback`
```ts
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { slug: "link-episodio" } },
  ],
  fallback: "blocking",
});
```

O `fallback` possui três opções de configuração
  * `false` vai dizer para não carregar nada e gerar o erro 404
  * `true` vai gerar o página pelo frontend e vai tentar retornar as informações mais como elas estão sendo processadas temos um erro 404, para evitar este erro temos que criar uma regra de espera
  * `blocking` vai gerar a página pelo servidor do next js e retornar as informações somente depois que tudo estiver carregado
```ts
import { useRouter } from "next/router";

const router = useRouter();

if (router.isFallback) {
  return <p>Carregando...</p>;
}
```

Para que todos os itens da nossa aplicação tenham acesso do podcast a tocar iremos usar os `context`

Para controlar o preenchimento da barra conforma o tempo passa iremos usar esta dependência
```bash
yarn add rc-slider
```

Para usar elementos do `HTML` precisamos criar uma referencia para conseguir manipular ele, para isso podemos usar a importação abaixo
```ts
import { useRef } from "react";
```

A tag `audio` possui dois itens que passa a informação do status do áudio
```ts
<audio
  src={episode.url}
  ref={audioRef}
  autoPlay
  onPlay={() => SetPlayingState(true)} // vai executar a função quando o áudio iniciar
  onPause={() => SetPlayingState(false)} // quando o áudio for pausado vai executar a função
/>
```

## Aula 05 - Surface exploration
>Etapa final da nossa missão. Em um novo planeta, vamos explorar a superfície e assimilar novos conhecimentos

Precisamos refatorar nosso context pois ele ficou em umas das páginas principais, enquanto tivermos somente um context isso não será problema, quando criamos mais context eles iram se misturar dificultando na interpretação e manutenção da aplicação

O `React` possui um pacote de ícones totalmente editáveis, para mais tem este [link](https://react-icons.github.io/react-icons/)
