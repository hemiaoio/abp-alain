import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbpModule } from '@abp/abp.module';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';
import { DelonModule } from './delon.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { StartupService } from '@core/startup/startup.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { SimpleInterceptor } from '@delon/auth';
// angular i18n
import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZhHans);

// JSON-Schema form
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';
import { AppConsts } from '@core/app-consts';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

export function getRemoteServiceBaseUrl() {
    return AppConsts.remoteServiceBaseUrl;
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, 
        BrowserAnimationsModule,
        HttpClientModule, 
        AbpModule,
        DelonModule.forRoot(),
        CoreModule,
        SharedModule,
        LayoutModule,
        JsonSchemaModule,
        RoutesModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
