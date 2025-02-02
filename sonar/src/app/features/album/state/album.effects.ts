import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlbumActions } from './album.actions';
import { AlbumService } from '../../../core/services/album/album.service';


@Injectable()
export class AlbumEffects {

  // Load Albums
  loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.loadAlbums),
      mergeMap(() =>
        this.albumService.loadAlbums().pipe(
          map(albums => AlbumActions.loadAlbumsSuccess({ albums })),
          catchError(error =>
            of(AlbumActions.loadAlbumsFailure({ error: error.message || 'Error loading albums' }))
          )
        )
      )
    )
  );

  // Add Album
  addAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.addAlbum),
      mergeMap(({ album }) =>
        this.albumService.addAlbum(album).pipe(
          map(newAlbum => AlbumActions.addAlbumSuccess({ album: newAlbum })),
          catchError(error =>
            of(AlbumActions.addAlbumFailure({ error: error.message || 'Error adding album' }))
          )
        )
      )
    )
  );

  // Update Album
  updateAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.updateAlbum),
      mergeMap(({ album }) => {
        return this.albumService.updateAlbum(album).pipe(
          map(updatedAlbum =>
            // We assume the backend returns the full updated album.
            AlbumActions.updateAlbumSuccess({
              album: { id: updatedAlbum.id, changes: updatedAlbum }
            })
          ),
          catchError(error =>
            of(AlbumActions.updateAlbumFailure({ error: error.message || 'Error updating album' }))
          )
        );
      })
    )
  );

  // Delete Album
  deleteAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.deleteAlbum),
      mergeMap(({ id }) =>
        this.albumService.deleteAlbum(id).pipe(
          map(() => AlbumActions.deleteAlbumSuccess({ id })),
          catchError(error =>
            of(AlbumActions.deleteAlbumFailure({ error: error.message || 'Error deleting album' }))
          )
        )
      )
    )
  );

  // Get Album by ID
  getAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.getAlbum),
      mergeMap(({ id }) =>
        this.albumService.getAlbumById(id).pipe(
          map(album => AlbumActions.getAlbumSuccess({ album })),
          catchError(error =>
            of(AlbumActions.getAlbumFailure({ error: error.message || 'Error fetching album' }))
          )
        )
      )
    )
  );

  // Get Album Tracks (musics)
  getAlbumTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.getAlbumTracks),
      mergeMap(({ id }) =>
        this.albumService.getAlbumTracks(id).pipe(
          map(tracks => AlbumActions.getAlbumTracksSuccess({ tracks })),
          catchError(error =>
            of(AlbumActions.getAlbumTracksFailure({ error: error.message || 'Error fetching album tracks' }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private albumService: AlbumService) { }

}
