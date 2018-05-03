import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { AppSessionService } from '@core/session/app-session.service';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { SessionServiceProxy, TokenAuthServiceProxy, AuthenticateModel, AuthenticateResultModel } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@core/utils/url-helper';
import { LoginService } from './login.service';

@Component({
    selector: 'he-passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [
        SocialService,
        SessionServiceProxy,
        TokenAuthServiceProxy,
        LoginService]
})
export class UserLoginComponent implements OnInit {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;
    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private _sessionService: AbpSessionService,
        private _sessionAppService: SessionServiceProxy,
        public loginService: LoginService,
        private _tokenAuthService: TokenAuthServiceProxy,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true]
        });
    }

    // region: fields

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }

    // endregion

    switch(ret: any) {
        this.type = ret.index;
    }
    ngOnInit(): void {
        if (this._sessionService.userId > 0 && UrlHelper.getReturnUrl() && UrlHelper.getSingleSignIn()) {
            // this._sessionAppService.updateUserSignInToken()
            //     .subscribe((result: UpdateUserSignInTokenOutput) => {
            //         const initialReturnUrl = UrlHelper.getReturnUrl();
            //         const returnUrl = initialReturnUrl + (initialReturnUrl.indexOf('?') >= 0 ? '&' : '?') +
            //             'accessToken=' + result.signInToken +
            //             '&userId=' + result.encodedUserId +
            //             '&tenantId=' + result.encodedTenantId;

            //         location.href = returnUrl;
            //     });
        }
    }
    submit() {
        this.loading = true;
        this.loginService.authenticate(
            () => this.loading = false
        );
    }
}
