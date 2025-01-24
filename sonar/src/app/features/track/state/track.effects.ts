import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, delay } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { TrackActions } from './track.actions';
import { FileService } from '../../../core/services/file/file.service';
import { TrackService } from '../services/track.service';
import { FileType } from '../../../core/enums/file-type.enum';


@Injectable()
export class TrackEffects {

  loadTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      mergeMap(() => from(this.trackService.getAllTracks())
        .pipe(
          delay(2000),
          map(tracks => TrackActions.loadTracksSuccess({ tracks })),
          catchError(error => of(TrackActions.loadTracksFailure({ error })))
        ))
    );
  });

  searchTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.searchTracks),
      mergeMap(({ name }) => from(this.trackService.getAllTracksByName(name))
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
      mergeMap(({ trackId }) =>
        from(this.fileService.getFileByTrackId(trackId, FileType.AUDIO)).pipe(
          delay(500),
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
      mergeMap(({ trackId }) =>
        from(this.fileService.getFileByTrackId(trackId, FileType.COVER)).pipe(
          delay(500),
          map((file) => {
            if (file) {
              return TrackActions.loadTrackCoverSuccess({ file });
            } else {
              return TrackActions.loadTrackCoverSuccess({ file: null });
            }
          }),
          catchError((error) =>
            of(TrackActions.loadTrackAudioFailure({ error: error.message }))
          )
        )
      )
    );
  });


  loadTrackAudios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTrackAudios),
      mergeMap(({ trackId }) =>
        from(this.fileService.getFilesByTrackId(trackId, FileType.AUDIO)).pipe(
          delay(500),
          map((files) => {
            if (files) {
              return TrackActions.loadTrackAudiosSuccess({ files });
            } else {
              return TrackActions.loadTrackAudiosFailure({ error: 'File not found' });
            }
          }),
          catchError((error) =>
            of(TrackActions.loadTrackAudiosFailure({ error: error.message }))
          )
        )
      )
    );
  });

  loadTrackCovers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTrackCovers),
      mergeMap(({ trackId }) =>
        from(this.fileService.getFilesByTrackId(trackId, FileType.COVER)).pipe(
          delay(500),
          map((files) => {
            if (files) {
              return TrackActions.loadTrackCoversSuccess({ files });
            } else {
              return TrackActions.loadTrackCoversSuccess({ files: [] });
            }
          }),
          catchError((error) =>
            of(TrackActions.loadTrackCoversFailure({ error: error.message }))
          )
        )
      )
    );
  });


  addTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.addTrack),
      mergeMap(({ track }) =>
        from(this.trackService.addTrack(track))
          .pipe(
            delay(500),
            map(track => TrackActions.addTrackSuccess({ track })),
            catchError(error => of(TrackActions.addTrackFailure({ error })))
          ))
    )
  );

  uploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.uploadTrackFiles),
      mergeMap(({ trackFile, coverFile, trackId }) =>
        from(this.fileService.storeFiles(trackFile, coverFile, trackId)).pipe(
          map((success) => {
            if (success) {
              return TrackActions.uploadTrackFilesSuccess();
            }
            return TrackActions.uploadTrackFilesFailure({ error: 'Failed to store files' });
          }),
          catchError((error: unknown) => {
            const errorMessage =
              error instanceof Error ? error.message : 'An unknown error occurred';
            return of(TrackActions.uploadTrackFilesFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  uploadAudioFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.uploadTrackFile),
      mergeMap(({ file }) =>
        from(this.fileService.storeFile(file)).pipe(
          map((success) => {
            if (success) {
              return TrackActions.uploadTrackFileSuccess({ file });
            }
            return TrackActions.uploadTrackFileFailure({ error: 'Failed to store files' });
          }),
          catchError((error: unknown) => {
            const errorMessage =
              error instanceof Error ? error.message : 'An unknown error occurred';
            return of(TrackActions.uploadTrackFileFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  uploadCoverFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.uploadTrackCover),
      mergeMap(({ file }) =>
        from(this.fileService.storeFile(file)).pipe(
          map((success) => {
            if (success) {
              return TrackActions.uploadTrackCoverSuccess({ file });
            }
            return TrackActions.uploadTrackCoverFailure({ error: 'Failed to store files' });
          }),
          catchError((error: unknown) => {
            const errorMessage =
              error instanceof Error ? error.message : 'An unknown error occurred';
            return of(TrackActions.uploadTrackCoverFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  updateTrack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.updateTrack),
      mergeMap(({ track }) =>
        from(this.trackService.updateTrack(track)).pipe(
          map((updatedTrack) => TrackActions.updateTrackSuccess({ track: updatedTrack })),
          catchError((error) =>
            of(TrackActions.updateTrackFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.deleteTrack),
      mergeMap(({ id }) =>
        from(this.trackService.deleteTrackById(id))
          .pipe(
            map(track => TrackActions.deleteTrackSuccess({ id })),
            catchError(error => of(TrackActions.deleteTrackFailure({ error })))
          ))
    )
  );


  constructor(private actions$: Actions, private fileService: FileService, private trackService: TrackService) { }
}


