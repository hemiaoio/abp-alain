import { Injectable, Inject } from '@angular/core';

import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';


import { PermissionCheckerService } from '@abp/auth/permission-checker.service';

import { AppSessionService } from '../session/app-session.service';
import { UrlHelper } from '@core/utils/url-helper';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private _sessionService: AppSessionService,
        private _permissionChecker: PermissionCheckerService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


        if (state && UrlHelper.isInstallUrl(state.url)) {
            return true;
        }

        if (!this._sessionService.user) {
            this._router.navigate(['/passport/login']);
            return false;
        }

        if (!route.data || !route.data['permission']) {
            return true;
        }
        console.log('canActivate');
        if (this._permissionChecker.isGranted(route.data['permission'])) {
            return true;
        }

        this._router.navigate([this.selectBestRoute()]);
        return false;

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        console.log('selectBestRoute');
        if (!this._sessionService.user) {
            return '/passport/login';
        }

        if (this._permissionChecker.isGranted('Pages.Administration.Host.Dashboard')) {
            return '/app/admin/hostDashboard';
        }

        if (this._permissionChecker.isGranted('Pages.Tenant.Dashboard')) {
            return '/app/main/dashboard';
        }

        if (this._permissionChecker.isGranted('Pages.Tenants')) {
            return '/dashboard';
            // return '/app/admin/tenants';
        }

        if (this._permissionChecker.isGranted('Pages.Administration.Users')) {
            return '/app/admin/users';
        }
        /* */
        // return '/dashboard';
    }
}
