import { Injectable } from '@angular/core';
import { CanActivateFn, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiService } from '../app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: ApiService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          // Redirect to the login page with the return URL
          return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
        }
        return true;
      })
    );
  }
}
