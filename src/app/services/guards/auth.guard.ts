import { inject } from '@angular/core';
import { CanActivateFn, Router, CanMatchFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuth()
    .pipe(
      tap((state) => {
        if (!state) {
          router.navigate(['/login']);
        }
      })
    );
};

export const authGuardMatch: CanMatchFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuth()
    .pipe(
      tap((state) => {
        if (!state) {
          router.navigate(['/login']);
        }
      }),
      take(1)
    );
};
