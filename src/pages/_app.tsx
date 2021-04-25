import "../styles/global.scss"; // importando a estilização global
import Header from "../components/header";
import Player from "../components/player";
import { PlayerContextProvider } from "../contexts/playerContext";
import { ThemeContextProvider } from "../contexts/themeContext";
import style from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <PlayerContextProvider>
        <div className={style.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
        </div>
      </PlayerContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;

/** explicação deste arquivo
 * ele sempre é executado por primeiro
 * tudo que tem nele é carregado toda vez que uma nova página é aberta
 * tudo que existe nele é passado para as outras páginas
 */
