import { Track } from "../../../features/track/state/track.model";

export interface Player {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  audioUrl: string | null;
  coverUrl: string | null;
}
