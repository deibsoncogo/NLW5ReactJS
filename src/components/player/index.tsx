import "rc-slider/assets/index.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiSkipPrevious, BiPlay, BiPause, BiSkipNext } from "react-icons/bi";
import { IoIosShuffle, IoIosRepeat } from "react-icons/io";
import Slider from "rc-slider";
import { UsePlayer } from "../../contexts/playerContext";
import { UseTheme } from "../../contexts/themeContext";
import ConvertDuration from "../../utils/convertDuration";
import style from "./style.module.scss";

export default function Player() {
  const { isThemeDark } = UseTheme();

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
    <div id={isThemeDark && style.dark} className={style.container}>
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
        <div id={isThemeDark && style.dark} className={style.emptyPlayer}>
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
                trackStyle={{
                  backgroundColor: isThemeDark
                    ? "var(--dark-green-800)" : "var(--purple-800)",
                }}
                railStyle={{
                  backgroundColor: isThemeDark
                    ? "var(--dark-green-300)" : "var(--purple-300)",
                }}
                handleStyle={{
                  borderWidth: 4,
                  borderColor: isThemeDark
                    ? "var(--dark-green-500)" : "var(--purple-900)",
                }}
              />
            ) : (
              <div id={isThemeDark && style.dark} className={style.emptySlider} />
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

        <div id={isThemeDark && style.dark} className={style.buttons}>
          <button
            type="button"
            onClick={ToggleShuffling}
            disabled={!episode || episodeList.length === 1}
            className={isShuffling ? style.isActive : ""}
          >
            <IoIosShuffle id={isThemeDark && style.dark} className={style.iconReact} />
          </button>

          <button type="button" onClick={PlayPrevious} disabled={!episode || !hasPrevious || isLoop}>
            <BiSkipPrevious id={isThemeDark && style.dark} className={style.iconReact} />
          </button>

          <button
            type="button"
            id={isThemeDark && style.dark}
            className={style.playButton}
            onClick={TogglePlay}
            disabled={!episode}
          >
            { isPlaying
              ? <BiPause id={isThemeDark && style.dark} className={style.iconReact} />
              : <BiPlay id={isThemeDark && style.dark} className={style.iconReact} /> }
          </button>

          <button type="button" onClick={PlayNext} disabled={!episode || !hasNext || isLoop}>
            <BiSkipNext id={isThemeDark && style.dark} className={style.iconReact} />
          </button>

          <button
            type="button"
            onClick={ToggleLoop}
            disabled={!episode || episodeList.length === 1}
            className={isLoop ? style.isActive : ""}
          >
            <IoIosRepeat id={isThemeDark && style.dark} className={style.iconReact} />
          </button>
        </div>
      </footer>
    </div>
  );
}
