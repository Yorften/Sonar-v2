import { Album } from "./album.model";

export interface Track {
  id: string;
  title: string;
  duration: number;
  audioFileId: string;
  coverFileId: string;
  album: Album;
}
