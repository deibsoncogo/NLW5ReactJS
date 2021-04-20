import style from "./style.module.scss";

export default function Player() {
  return (
    <div className={style.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className={style.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={style.empty}>
        <div className={style.progress}>
          <span>00:00</span>
          <div className={style.slider}>
            <div className={style.emptySlider}></div>
          </div>
          <span>00:00</span>
        </div>

        <div className={style.buttons}>
          <button type="button">
            <img src="./shuffle.svg" alt="Embaralhar" />
          </button>

          <button type="button">
            <img src="./play-previous.svg" alt="Tocar o anterior" />
          </button>

          <button type="button" className={style.playButton}>
            <img src="./play.svg" alt="Tocar" />
          </button>

          <button type="button">
            <img src="./play-next.svg" alt="Tocar o próximo" />
          </button>

          <button type="button">
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
