import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, switchMap } from 'rxjs/operators';
import { selectJwt } from '../features/auth/state/auth.reducer';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  return store.select(selectJwt).pipe(
    first(),
    switchMap(token => {
      if (token) {
        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(clonedReq);
      }
      return next(req);
    })
  );

};
