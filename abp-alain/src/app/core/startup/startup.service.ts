import { Router } from '@angular/router';
import { Injectable, Injector, Inject, ReflectiveInjector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import { MenuService, SettingsService, TitleService, Menu } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { AppConsts } from '@core/app-consts';
import { environment } from '@env/environment';
import { extend } from '@core/utils/extend';
import { AppSessionService } from '@core/session/app-session.service';

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import * as moment from 'moment';
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private _sessionService: AppSessionService,
        private httpClient: HttpClient,
        private injector: Injector) { }

    private viaHttp(resolve: any, reject: any) {
        this.httpClient
            .get('assets/app-data.json')
            .mergeMap((appData: any) => {
                AppConsts.appBaseUrl = appData.app.appBaseUrl;
                AppConsts.remoteServiceBaseUrl = appData.app.remoteServiceBaseUrl;
                environment.SERVER_URL = appData.app.remoteServiceBaseUrl;
                // 设置页面标题的后缀
                this.titleService.suffix = appData.app.name;

                const headers = {};
                const cultureName = abp.utils.getCookieValue('Abp.Localization.CultureName');
                const token = abp.auth.getToken();
                const tenantId = abp.multiTenancy.getTenantIdCookie() as any;
                const url = AppConsts.remoteServiceBaseUrl + '/AbpUserConfiguration/GetAll';
                if (cultureName) {
                    headers['.AspNetCore.Culture'] = cultureName;
                }
                if (token) {
                    headers['Authorization'] = 'Bearer ' + token;
                }
                if (tenantId) {
                    headers['Abp.TenantId'] = tenantId + '';
                }
                return this.httpClient.get(url, {
                    headers: headers
                }).map(abpData => ({ appData: appData, abpData: abpData }));
            }).mergeMap((result: any) => {
                const appData: any = result.appData;
                const abpData: any = result.abpData;
                extend(true, abp, abpData);
                abp.clock.provider = this.getCurrentClockProvider(abpData.result.clock.provider);
                moment.locale(abp.localization.currentLanguage.name);
                this.checkMenusPermission(appData.menus);
                this.menuService.add(appData.menus);
                return Observable.fromPromise(this._sessionService.init());
            })
            .subscribe((res: boolean) => { },
                (error) => { console.log(error); },
                () => { resolve(null); });
    }
    private getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
        if (currentProviderName === 'unspecifiedClockProvider') {
            return abp.timing.unspecifiedClockProvider;
        }

        if (currentProviderName === 'utcClockProvider') {
            return abp.timing.utcClockProvider;
        }
        return abp.timing.localClockProvider;
    }

    /**
     * 检查菜单权限
     * @param menus alain的菜单
     */
    private checkMenusPermission(menus: Menu[]) {
        menus.forEach(menu => {
            menu.hide = menu.permission && !abp.auth.isGranted(menu.permission);

            if (menu.children !== undefined && menu.children.length > 0) {
                this.checkMenusPermission(menu.children);
            }
        });
    }
    private viaMock(resolve: any, reject: any) {
        // const tokenData = this.tokenService.get();
        // if (!tokenData.token) {
        //     this.injector.get(Router).navigateByUrl('/passport/login');
        //     resolve({});
        //     return;
        // }
        // mock
        const app: any = {
            name: `ng-alain`,
            description: `Ng-zorro admin panel front-end framework`
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/img/zorro.svg',
            email: 'cipchk@qq.com',
            token: '123456789'
        };
        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(app);
        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(user);
        // ACL：设置权限为全量
        this.aclService.setFull(true);
        // 初始化菜单
        this.menuService.add([
            {
                text: '主导航',
                group: true,
                children: [
                    {
                        text: '仪表盘',
                        link: '/dashboard',
                        icon: 'icon-speedometer'
                    },
                    {
                        text: '快捷菜单',
                        icon: 'icon-rocket',
                        shortcut_root: true
                    }
                ]
            }
        ]);
        // 设置页面标题的后缀
        this.titleService.suffix = app.name;

        resolve({});
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            // http
            this.viaHttp(resolve, reject);
            // mock
            // this.viaMock(resolve, reject);
        });
    }
}
