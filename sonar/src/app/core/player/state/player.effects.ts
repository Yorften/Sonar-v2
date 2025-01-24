import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { PlayerActions } from './player.actions';

@Injectable()
export class PlayerEffects {


  // loadTrackMedia$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(PlayerActions.loadTrackMedia),
  //     concatMap(() =>
  //             /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //             EMPTY.pipe(
  //               map(data => PlayerActions.loadPlayerSuccess({ data })),
  //               catchError(error => of(PlayerActions.loadPlayerFailure({ error }))))
  //           )
  //   );
  // });

  constructor(private actions$: Actions) {}
}
