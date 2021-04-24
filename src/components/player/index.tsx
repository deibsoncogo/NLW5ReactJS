import "rc-slider/assets/index.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiSkipPrevious, BiPlay, BiPause, BiSkipNext } from "react-icons/bi";
import { IoIosShuffle, IoIosRepeat } from "react-icons/io";
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
                trackStyle={{ backgroundColor: "#6725ff" }} // --purple-850
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#4c00ff", borderWidth: 4 }} // --purple-900
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
            <IoIosShuffle className={style.iconReact} />
          </button>

          <button type="button" onClick={PlayPrevious} disabled={!episode || !hasPrevious || isLoop}>
            <BiSkipPrevious className={style.iconReact} />
          </button>

          <button
            type="button"
            className={style.playButton}
            onClick={TogglePlay}
            disabled={!episode}
          >
            { isPlaying
              ? <BiPause className={style.iconReact} /> : <BiPlay className={style.iconReact} /> }
          </button>

          <button type="button" onClick={PlayNext} disabled={!episode || !hasNext || isLoop}>
            <BiSkipNext className={style.iconReact} />
          </button>

          <button
            type="button"
            onClick={ToggleLoop}
            disabled={!episode || episodeList.length === 1}
            className={isLoop ? style.isActive : ""}
          >
            <IoIosRepeat className={style.iconReact} />
          </button>
        </div>
      </footer>
    </div>
  );
}
