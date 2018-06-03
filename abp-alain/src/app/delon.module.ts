/**
 * 进一步对基础模块的导入提炼
 * 有关模块注册指导原则请参考：https://github.com/cipchk/ng-alain/issues/180
 */
import {
    NgModule,
    Optional,
    SkipSelf,
    ModuleWithProviders,
} from '@angular/core';

import { RouteReuseStrategy } from '@angular/router';
import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule, AdSimpleTableConfig, ReuseTabService, ReuseTabStrategy } from '@delon/abc';
import { DelonAuthModule } from '@delon/auth';
import { DelonACLModule } from '@delon/acl';
import { DelonCacheModule } from '@delon/cache';
// mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
import { environment } from '@env/environment';
const MOCKMODULE = !environment.production
    ? [DelonMockModule.forRoot({ data: MOCKDATA })]
    : [];

// region: global config functions

import { AdPageHeaderConfig } from '@delon/abc';
export function pageHeaderConfig(): AdPageHeaderConfig {
    return Object.assign(new AdPageHeaderConfig(), { home_i18n: 'home' });
}
export function simpleTableConfig(): AdSimpleTableConfig {
    const tableConfig = new AdSimpleTableConfig();
    tableConfig.ps = 15;
    return tableConfig;
}
import { DelonAuthConfig } from '@delon/auth';
import { extend } from '@core/utils/extend';
import { DelonUtilModule } from '@delon/util';
import { NgZorroAntdModule } from 'ng-zorro-antd';
export function delonAuthConfig(): DelonAuthConfig {
    return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
        login_url: '/passport/login',
    });
}

// endregion

@NgModule({
    imports: [
        NgZorroAntdModule.forRoot(),
        AlainThemeModule.forRoot(),
        DelonABCModule.forRoot(),
        DelonAuthModule.forRoot(),
        DelonACLModule.forRoot(),
        DelonCacheModule.forRoot(),
        DelonUtilModule.forRoot(),
        // mock
        ...MOCKMODULE,
    ],
})
export class DelonModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: DelonModule,
    ) {
        throwIfAlreadyLoaded(parentModule, 'DelonModule');
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DelonModule,
            providers: [
                // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `simple-table` 的页码默认为 `20` 行
                { provide: RouteReuseStrategy, useClass: ReuseTabStrategy, deps: [ReuseTabService] },
                { provide: AdSimpleTableConfig, useFactory: simpleTableConfig },
                { provide: AdPageHeaderConfig, useFactory: pageHeaderConfig },
                { provide: DelonAuthConfig, useFactory: delonAuthConfig },
            ],
        };
    }
}
