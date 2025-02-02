import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Track } from '../../../shared/models/track.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /** Get all tracks as an array */
  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/user/musics`);
  }

  getTracksByTitle(title: string): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/user/musics?title=${title}`);
  }

  // /** Get a single track by id */
  // getTrackById(id: string): Observable<Track> {
  //   return this.http.get<Track>(`${this.apiUrl}/user/musics/${id}`);
  // }

  /**
   * Upload (create) a new track using a multipart form.
   * Expects a FormData that includes:
   * - "music": a Blob containing a JSON string (MusicDTO)
   * - "file": the track file (required)
   * - "cover": the cover file (optional)
   */
  uploadTrack(formData: FormData): Observable<Track> {
    return this.http.post<Track>(`${this.apiUrl}/admin/musics`, formData);
  }

  /**
   * Update an existing track.
   * Uses the track id and a FormData (similar to uploadTrack).
   */
  updateTrack(formData: FormData, id: string): Observable<Track> {
    return this.http.put<Track>(`${this.apiUrl}/admin/musics/${id}`, formData);
  }

  /** Delete a track by id */
  deleteTrack(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/musics/${id}`);
  }

  /**
   * Get the audio file for a track.
   * Returns the raw binary as a Blob.
   */
  getAudioFile(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/user/musics/${id}/file`, { responseType: 'blob' });
  }

  /**
   * Get the cover file for a track.
   * Returns the raw binary as a Blob.
   */
  getCoverFile(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/user/musics/${id}/cover`, { responseType: 'blob' });
  }
}
