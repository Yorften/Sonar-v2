import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { selectJwt } from '../features/auth/state/auth.reducer';

export const UserGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectJwt).pipe(
    take(1),
    map(jwt => {
      if (!jwt) {
        return true;
      }
      return router.createUrlTree(['/'], {
      });
    })
  );
  
};
