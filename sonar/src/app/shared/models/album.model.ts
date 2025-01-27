import { Track } from "./track.model";

export interface Album {
    id: string;
    title: string;
    artist: string;
    year: number;
    musics: Track[]; // Reference to the Music model
  }