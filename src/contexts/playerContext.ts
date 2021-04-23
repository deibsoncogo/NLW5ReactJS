import { createContext } from "react";

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
}

export const PlayerContext = createContext({} as PlayerContextData);
