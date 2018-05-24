import {
  CanDeactivate,
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppAuthService } from './auth.service';
import { RouteName } from './routeName';
import { ClaimType } from './app.enum';
import { UtilService, ErrorCode } from 'src/app/Module_Core';
import { IAuthenticatedUser, AppClaim } from './app.model';
import { map } from 'rxjs/operators';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  label_Warning = 'DIALOG.LEAVE_WARNING';
  constructor(private util: UtilService) {
    this.util.translate(this.label_Warning).subscribe(texts => {
      this.label_Warning = texts[this.label_Warning];
    });
  }
  canDeactivate(
    component: ComponentCanDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate()
      ? true
      : // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
        // when navigating away from your angular app, the browser will show a generic warning message
        // see http://stackoverflow.com/a/42207299/7307355
        confirm(this.label_Warning);
  }
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
  private errorCode: string;
  constructor(private authService: AppAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this returnUrl can be returned to login page, and navigate to the url after login successfully
    // in login component:
    // this.returnUrl = this.route.snapshot.queryParmaMap.get('returnUrl');
    const returnUrl = state.url;
    const requiredClaims: string[] = route.data['claimTypes']; // claimTypes is defined in [data] key in route
    if (isDebug()) {
      // return true;
    }
    return this.authService.getUserInfo().pipe(
      map((user: IAuthenticatedUser) => {
        if (!!user) {
          const hasValidClaim = this.validateClaim(requiredClaims, user.claims);
          return hasValidClaim;
        }
        this.router.navigate([
          RouteName.Exception,
          {
            errorCode: ErrorCode.ServerError,
            navigateRoute: RouteName.Home
          }
        ]);
        return false;
      })
    );
  }

  validateClaim(requiredClaims: string[], claims: AppClaim[]) {
    let hasValidClaim = false;
    if (!requiredClaims || !requiredClaims.length) {
      hasValidClaim = true;
      return true;
    }
    for (const requiredClaim of requiredClaims) {
      for (const claim of claims) {
        if (requiredClaim === claim.claimType && claim.claimValue === 'true') {
          hasValidClaim = true;
          break;
        }
      }
      if (hasValidClaim) {
        break;
      }
    }
    return hasValidClaim;
  }
}

@Injectable()
export class StaffAuthenticateGuard implements CanActivate {
  private errorCode: string;
  constructor(private authService: AppAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this returnUrl can be returned to login page, and navigate to the url after login successfully
    // in login component:
    // this.returnUrl = this.route.snapshot.queryParmaMap.get('returnUrl');
    const returnUrl = state.url;
    return this.authService.getUserInfo().pipe(
      map((user: IAuthenticatedUser) => {
        if (
          !!user &&
          (user.isSysAdmin ||
            user.isSchoolAdmin ||
            user.isPricipal ||
            user.isTeacher)
        ) {
          return true;
        }
        this.router.navigate([
          RouteName.Exception,
          {
            errorCode: ErrorCode.Unauthorized,
            navigateRoute: RouteName.Home
          }
        ]);
        return false;
      })
    );
  }
}

@Injectable()
export class SysAdminAuthenticateGuard implements CanActivate {
  private errorCode: string;
  constructor(private authService: AppAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this returnUrl can be returned to login page, and navigate to the url after login successfully
    const returnUrl = state.url;
    if (isDebug()) {
      return true;
    }
    return this.authService.getUserInfo().pipe(
      map((user: IAuthenticatedUser) => {
        if (!!user && user.isSysAdmin) {
          return true;
        }
        this.router.navigate([
          RouteName.Exception,
          {
            errorCode: ErrorCode.Unauthorized,
            navigateRoute: RouteName.Home
          }
        ]);
        return false;
      })
    );
  }
}
function isDebug() {
  const origin = window.location.origin;
  return origin.indexOf(':4200') > 0;
}
