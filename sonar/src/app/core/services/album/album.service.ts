import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Album } from '../../../shared/models/album.model';
import { Track } from '../../../shared/models/track.model';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get all albums
  loadAlbums(): Observable<any> {
    const url = `${this.apiUrl}/user/albums`;
    return this.http.get<any>(url);
  }

  // Get a single album by id
  getAlbumById(id: string): Observable<Album> {
    const url = `${this.apiUrl}/user/albums/${id}`;
    return this.http.get<Album>(url);
  }

  // Add a new album
  addAlbum(album: Album): Observable<Album> {
    const url = `${this.apiUrl}/admin/albums`;
    return this.http.post<Album>(url, album);
  }

  // Update an album; here, we pass the album id and the updated data
  updateAlbum(album: Update<Album>): Observable<Album> {
    const {id , changes} = album;
    const url = `${this.apiUrl}/admin/albums/${id}`;
    return this.http.put<Album>(url, changes);
  }

  // Delete an album by id
  deleteAlbum(id: string): Observable<any> {
    const url = `${this.apiUrl}/admin/albums/${id}`;
    return this.http.delete(url);
  }

  // Get album tracks (musics) from "/user/albums/:id/musics"
  getAlbumTracks(id: string): Observable<Track[]> {
    const url = `${this.apiUrl}/user/albums/${id}/musics`;
    return this.http.get<Track[]>(url);
  }
}
