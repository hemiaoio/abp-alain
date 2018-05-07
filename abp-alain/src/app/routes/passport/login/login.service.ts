import { Injectable, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import {
    TokenAuthServiceProxy,
    AuthenticateModel,
    AuthenticateResultModel,
    ExternalLoginProviderInfoModel,
    ExternalAuthenticateModel,
    ExternalAuthenticateResultModel
} from '@shared/service-proxies/service-proxies';

import { MessageService } from '@abp/message/message.service';
import { LogService } from '@abp/log/log.service';
import { TokenService } from '@abp/auth/token.service';
import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from '@core/app-consts';
import { UrlHelper } from '@core/utils/url-helper';
import { AppSessionService } from '@core/session/app-session.service';
import { ITokenService, DA_SERVICE_TOKEN, JWTTokenModel, SimpleTokenModel } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class LoginService {

    static readonly twoFactorRememberClientTokenName = 'TwoFactorRememberClientToken';

    authenticateModel: AuthenticateModel;
    authenticateResult: AuthenticateResultModel;

    rememberMe: boolean;

    constructor(
        private _tokenAuthService: TokenAuthServiceProxy,
        private _router: Router,
        private _utilsService: UtilsService,
        private _messageService: MessageService,
        private _tokenService: TokenService,
        private _logService: LogService,
        private _sessionService: AppSessionService,
        private _startUpService: StartupService,
        @Optional() @Inject(ReuseTabService) private _reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private _abcTokenService: ITokenService
    ) {
        this.clear();
    }

    authenticate(finallyCallback?: () => void): void {
        finallyCallback = finallyCallback || (() => { });
        this._tokenAuthService
            .authenticate(this.authenticateModel)
            .subscribe(
                (result: AuthenticateResultModel) => {
                    this.processAuthenticateResult(result);
                },
                () => { },
                () => { finallyCallback(); });
    }

    private processAuthenticateResult(authenticateResult: AuthenticateResultModel) {
        this.authenticateResult = authenticateResult;

        if (authenticateResult.accessToken) {
            // Successfully logged in
            this.login(authenticateResult.accessToken, authenticateResult.encryptedAccessToken, authenticateResult.expireInSeconds, this.rememberMe);

        } else {
            // Unexpected result!

            this._logService.warn('Unexpected authenticateResult!');
            this._router.navigate(['passport/login']);
        }
    }

    private login(accessToken: string, encryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean): void {

        const tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;

        this._tokenService.setToken(
            accessToken,
            tokenExpireDate
        );
        const tokenModel = new SimpleTokenModel();
        tokenModel.token = accessToken;
        this._abcTokenService.set(tokenModel);
        this._utilsService.setCookieValue(
            AppConsts.authorization.encrptedAuthTokenName,
            encryptedAccessToken,
            tokenExpireDate,
            abp.appPath
        );
        this._startUpService.load().then(() => {
            let initialUrl = UrlHelper.initialUrl;

            if (initialUrl.indexOf('/login') > 0) {
                initialUrl = AppConsts.appBaseUrl;
            }
            this._reuseTabService.clear();
            // this._router.navigate([initialUrl]);
            location.href = '/';
        });
    }

    private clear(): void {
        this.authenticateModel = new AuthenticateModel();
        this.authenticateModel.rememberClient = false;
        this.authenticateResult = null;
        this.rememberMe = false;
    }
}
