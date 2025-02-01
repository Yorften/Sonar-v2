import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AlbumActions } from './album.actions';


@Injectable()
export class AlbumEffects {

  // loadAlbums$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(AlbumActions.loadAlbums),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => AlbumActions.loadAlbumsSuccess({ data })),
  //         catchError(error => of(AlbumActions.loadAlbumsFailure({ error }))))
  //     )
  //   );
  // });


  constructor(private actions$: Actions) { }
}
