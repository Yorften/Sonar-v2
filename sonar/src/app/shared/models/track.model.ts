import { Album } from "./album.model";

export interface Track {
  id: string;
  name: string;
  duration: number;
  audioFileId: string;
  coverFileId: string;
  ablum: Album;
}
