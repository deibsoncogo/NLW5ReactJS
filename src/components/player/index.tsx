import "rc-slider/assets/index.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import { UsePlayer } from "../../contexts/playerContext";
import ConvertDuration from "../../utils/convertDuration";
import style from "./style.module.scss";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList, currentEpisodeIndex, isPlaying, TogglePlay, SetPlayingState, PlayNext, PlayPrevious,
    hasPrevious, hasNext, ToggleLoop, isLoop, ToggleShuffling, isShuffling, clearPlayerState,
  } = UsePlayer();

  useEffect(() => {
    if (!audioRef.current) { return; }
    if (isPlaying) { audioRef.current.play(); } else { audioRef.current.pause(); }
  }, [isPlaying]);

  function SetupProgressListener() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function HandleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function EpisodeEnded() {
    if (isShuffling) {
      PlayNext();
    } else {
      clearPlayerState();
      setProgress(0);
    }
  }

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={style.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
        <div className={style.currentEpisode}>
          <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={style.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      ) }

      <footer className={!episode ? style.empty : ""}>
        <div className={style.progress}>
          <span>{ConvertDuration(progress)}</span>
          <div className={style.slider}>

            { episode ? (
              <Slider
                max={episode.durationSeconds}
                value={progress}
                onChange={HandleSeek}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <div className={style.emptySlider} />
            ) }

          </div>
          <span>{ConvertDuration(episode?.durationSeconds ?? 0)}</span>
        </div>

        { episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onEnded={EpisodeEnded}
            loop={isLoop}
            onPlay={() => SetPlayingState(true)}
            onPause={() => SetPlayingState(false)}
            onLoadedMetadata={SetupProgressListener}
          />
        ) }

        <div className={style.buttons}>
          <button
            type="button"
            onClick={ToggleShuffling}
            disabled={!episode || episodeList.length === 1}
            className={isShuffling ? style.isActive : ""}
          >
            <img src="./shuffle.svg" alt="Embaralhar" />
          </button>

          <button type="button" onClick={PlayPrevious} disabled={!episode || !hasPrevious}>
            <img src="./play-previous.svg" alt="Tocar o anterior" />
          </button>

          <button
            type="button"
            className={style.playButton}
            onClick={TogglePlay}
            disabled={!episode}
          >
            { isPlaying
              ? <img src="./pause.svg" alt="Pausar" /> : <img src="./play.svg" alt="Tocar" /> }
          </button>

          <button type="button" onClick={PlayNext} disabled={!episode || !hasNext}>
            <img src="./play-next.svg" alt="Tocar o próximo" />
          </button>

          <button
            type="button"
            onClick={ToggleLoop}
            disabled={!episode || episodeList.length === 1}
            className={isLoop ? style.isActive : ""}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
