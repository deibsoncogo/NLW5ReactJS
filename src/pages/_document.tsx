import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head> {/* é um dos locais que podemos injetar nossa configurações */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <Main /> {/* onde vai ficar nossa aplicação */}
          <NextScript /> {/* onde vai ficar os aquivos que o Next precisa */}
        </body>
      </Html>
    );
  }
}

/** explicação deste arquivo
 * o Next não permite edição direta do arquivo index.html
 * por isso que o arquivo não existe
 * para domificar ele temos que criar este arquivo neste padrão
 * este arquivo é executado somente uma vez
 */
