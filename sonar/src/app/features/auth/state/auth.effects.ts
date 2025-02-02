import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../core/services/auth/auth.service';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          mergeMap((loginResponse: { accessToken: string }) =>
            this.authService.userInfo().pipe(
              map(userResponse =>
                AuthActions.loginSuccess({
                  accessToken: loginResponse.accessToken,
                  user: userResponse
                })
              ),
              catchError(() => of(AuthActions.loginFailure({ error: 'error' })))
            )
          ),
          catchError(() => of(AuthActions.loginFailure({ error: 'error' })))
        )
      )
    )
  );


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ user }) =>
        this.authService.register(user).pipe(
          map(user => AuthActions.registerSuccess({ error: 'success' })),
          catchError(() => of(AuthActions.registerFailure({ error: 'error' })))
        )
      )
    )
  );


  // Effect to handle logout action.
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          // On success, dispatch logoutSuccess.
          map(() => AuthActions.logoutSuccess()),
          // On error, dispatch logoutFailure with error: 'error'
          catchError(() => of(AuthActions.logoutFailure({ error: 'error' })))
        )
      )
    )
  );


  constructor(private actions$: Actions, private authService: AuthService) { }
}
