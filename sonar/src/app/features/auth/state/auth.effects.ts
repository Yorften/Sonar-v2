import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AuthActions } from './auth.actions';


@Injectable()
export class AuthEffects {

  // loadUsers$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(AuthActions.login),
  //     concatMap(() =>
  //       EMPTY.pipe(
  //         map(data => AuthActions.loginSuccess({ data })),
  //         catchError(error => of(AuthActions.loginFailure({ error }))))
  //     )
  //   );
  // });


  constructor(private actions$: Actions) {}
}
