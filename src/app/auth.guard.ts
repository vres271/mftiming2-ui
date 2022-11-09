import { tap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Inject, Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from "@angular/router"

@Injectable()
export class AuthGuard
  implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthService) private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getIsAut()
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(next, state)
  }
  
}