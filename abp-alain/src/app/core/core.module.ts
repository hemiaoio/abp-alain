import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AppSessionService } from '@core/session/app-session.service';
import { AppUrlService } from '@core/nav/app-url.service';
import { SessionServiceProxy } from '@shared/service-proxies/service-proxies';
import { AbpTokenService } from '@core/session/abp-token.service';
import { DA_SERVICE_TOKEN } from '@delon/auth';


@NgModule({
  providers: [
    SessionServiceProxy,
    AppSessionService,
    AppUrlService,
    { provide: DA_SERVICE_TOKEN, useClass: AbpTokenService }
]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
