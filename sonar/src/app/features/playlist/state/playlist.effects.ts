import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { PlaylistActions } from './playlist.actions';


@Injectable()
export class PlaylistEffects {

  // loadPlaylists$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(PlaylistActions.loadPlaylists),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => PlaylistActions.loadPlaylistsSuccess({ data })),
  //         catchError(error => of(PlaylistActions.loadPlaylistsFailure({ error }))))
  //     )
  //   );
  // });


  constructor(private actions$: Actions) {}
}
