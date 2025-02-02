import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(response => {
            localStorage.setItem("accessToken", response.accessToken)
            return AuthActions.loginSuccess({ accessToken: response.accessToken })
          }),
          catchError(() => of(AuthActions.loginFailure({ error: 'error' })))
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );


  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      mergeMap(() =>
        this.authService.userInfo().pipe(
          map(response => {
            console.log("user: " + response);
            localStorage.setItem("user", JSON.stringify(response))
            return AuthActions.loadUserSuccess({ user: response })
          }),
          catchError(() => of(AuthActions.loadUserFailure({ error: 'error' })))
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
      map(() => {
        console.log("test");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        return AuthActions.logoutSuccess()
      }),
      catchError(() => of(AuthActions.logoutFailure({ error: 'error' })))
    )
  );

  redirectAfterLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        this.router.navigate(['/auth/login']);
      })
    ),
    { dispatch: false }
  );



  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }
}
