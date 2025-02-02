import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, delay } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { TrackActions } from './track.actions';
import { TrackService } from '../../../core/services/track/track.service';
import { Track } from '../../../shared/models/track.model';
import { Update } from '@ngrx/entity';
import { AlbumService } from '../../../core/services/album/album.service';


@Injectable()
export class TrackEffects {

  loadTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      mergeMap(() => from(this.trackService.getTracks())
        .pipe(
          delay(2000),
          map(tracks => TrackActions.loadTracksSuccess({ tracks })),
          catchError(error => of(TrackActions.loadTracksFailure({ error })))
        ))
    );
  });

    // Get Album Tracks (musics)
    getAlbumTracks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TrackActions.getAlbumTracks),
        mergeMap(({ id }) =>
          this.albumService.getAlbumTracks(id).pipe(
            map(tracks => TrackActions.getAlbumTracksSuccess({ tracks })),
            catchError(error =>
              of(TrackActions.getAlbumTracksFailure({ error: error.message || 'Error fetching album tracks' }))
            )
          )
        )
      )
    );

  searchTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.searchTracks),
      mergeMap(({ title }) => from(this.trackService.getTracksByTitle(title))
        .pipe(
          delay(2000),
          map(tracks => TrackActions.searchTracksSuccess({ tracks })),
          catchError(error => of(TrackActions.searchTracksFailure({ error })))
        ))
    );
  });

  loadTrackAudio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTrackAudio),
      mergeMap(({ audioFileId }) =>
        from(this.trackService.getAudioFile(audioFileId)).pipe(
          map((file) => {
            if (file) {
              return TrackActions.loadTrackAudioSuccess({ file });
            } else {
              return TrackActions.loadTrackAudioFailure({ error: 'File not found' });
            }
          }),
          catchError((error) =>
            of(TrackActions.loadTrackAudioFailure({ error: error.message }))
          )
        )
      )
    );
  });

  loadTrackCover$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTrackCover),
      mergeMap(({ coverFileId }) =>
        from(this.trackService.getCoverFile(coverFileId)).pipe(
          map((file) => {
            if (file) {
              return TrackActions.loadTrackCoverSuccess({ file });
            } else {
              return TrackActions.loadTrackCoverSuccess({ file: null });
            }
          }),
          catchError((error) => {
            if (error.status === 404) {
              return of(TrackActions.loadTrackCoverSuccess({ file: null }));
            }
            return of(TrackActions.loadTrackCoverFailure({ error: error.message }))
          })
        )
      )
    );
  });


  addTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.addTrack),
      mergeMap(({ formData }) =>
        from(this.trackService.uploadTrack(formData)).pipe(
          map((track: Track) => TrackActions.addTrackSuccess({ track })),
          catchError(error =>
            of(TrackActions.addTrackFailure({ error: error.message || 'Error adding track' }))
          )
        )
      )
    )
  );

  updateTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.updateTrack),
      mergeMap(({ formData, id }) =>
        from(this.trackService.updateTrack(formData, id)).pipe(
          map((updatedTrack: Track) => {
            const updateObj: Update<Track> = {
              id: updatedTrack.id,
              changes: updatedTrack
            };
            return TrackActions.updateTrackSuccess({ track: updateObj });
          }),
          catchError(error =>
            of(TrackActions.updateTrackFailure({ error: error.message || 'Error updating track' }))
          )
        )
      )
    )
  );


  deleteTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.deleteTrack),
      mergeMap(({ id }) =>
        from(this.trackService.deleteTrack(id))
          .pipe(
            map(track => TrackActions.deleteTrackSuccess({ id })),
            catchError(error => of(TrackActions.deleteTrackFailure({ error })))
          ))
    )
  );


  constructor(private actions$: Actions, private trackService: TrackService, private albumService: AlbumService) { }
}


