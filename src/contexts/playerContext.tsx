import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
  title: string,
  members: string,
  thumbnail: string,
  durationSeconds: number,
  url: string,
}

type PlayerContextData = {
  episodeList: Episode[],
  currentEpisodeIndex: number,
  isPlaying: boolean,
  Play: (episode: Episode) => void,
  TogglePlay: () => void,
  SetPlayingState: (state: boolean) => void,
  PlayList: (list: Episode[], index: number) => void,
  PlayPrevious: () => void,
  PlayNext: () => void,
  hasPrevious: boolean,
  hasNext: boolean,
  ToggleLoop: () => void,
  isLoop: boolean,
  ToggleShuffling: () => void,
  isShuffling: boolean,
  clearPlayerState: () => void,
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode,
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function Play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
    setIsShuffling(false);
    setIsLoop(false);
  }

  function PlayList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function TogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function ToggleLoop() {
    setIsLoop(!isLoop);
    setIsShuffling(false);
  }

  function ToggleShuffling() {
    setIsShuffling(!isShuffling);
    setIsLoop(false);
  }

  function SetPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function PlayPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function PlayNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      Play,
      TogglePlay,
      SetPlayingState,
      PlayList,
      PlayPrevious,
      PlayNext,
      hasPrevious,
      hasNext,
      ToggleLoop,
      isLoop,
      ToggleShuffling,
      isShuffling,
      clearPlayerState,
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const UsePlayer = () => useContext(PlayerContext);
