import { TenantChangeModalComponent } from './passport/tenant-change-modal/tenant-change-modal.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { BaseComponent } from './passport/base/base.component';
import { TenantChangeComponent } from './passport/tenant-change/tenant-change.component';
import { AboutComponent } from './about/about.component';



@NgModule({
    imports: [SharedModule, RouteRoutingModule],
    declarations: [
        DashboardComponent,
        // passport pages
        BaseComponent,
        TenantChangeComponent,
        TenantChangeModalComponent,
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component,
        AboutComponent
    ],
    entryComponents: [TenantChangeModalComponent]

})
export class RoutesModule { }
