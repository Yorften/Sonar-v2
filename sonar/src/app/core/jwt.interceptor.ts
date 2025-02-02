import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { selectJwt } from '../features/auth/state/auth.reducer';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  return store.select(selectJwt).pipe(
    take(1),
    switchMap(token => {
      
      console.log("token: " + token);
      
      const newHeaders = token
        ? req.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
        : req.headers
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

      const clonedReq = req.clone({ headers: newHeaders });
      return next(clonedReq);
    })
  );
};
