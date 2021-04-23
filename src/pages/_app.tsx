import "../styles/global.scss"; // importando a estilização global
import { useState } from "react";
import Header from "../components/header";
import Player from "../components/player";
import { PlayerContext } from "../contexts/playerContext";
import style from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function Play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    TogglePlay();
  }

  function TogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function SetPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      Play,
      TogglePlay,
      SetPlayingState,
    }}
    >
      <div className={style.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;

/** explicação deste arquivo
 * ele sempre é executado por primeiro
 * tudo que tem nele é carregado toda vez que uma nova página é aberta
 * tudo que existe nele é passado para as outras páginas
 */
