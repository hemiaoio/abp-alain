import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
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
import { AppRouteGuard } from '@core/auth/app-route-guard';
import { BaseComponent } from './passport/base/base.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        canActivate: [AppRouteGuard],
        canActivateChild: [AppRouteGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘' } },
            // 业务子模块
            { path: 'tenant', loadChildren: './tenant/tenant.module#TenantModule' },
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
            { path: 'about', component: AboutComponent, data: { title: '关于' } }
        ]
    },
    // 全屏布局
    {
        path: 'fullscreen',
        component: LayoutFullScreenComponent,
        children: [
        ]
    },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            {
                path: '', component: BaseComponent, children: [
                    { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
                    { path: 'register', component: UserRegisterComponent },
                    { path: 'register-result', component: UserRegisterResultComponent }]
            }
        ]
    },
    // 单页不包裹Layout
    { path: 'callback/:type', component: CallbackComponent },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule],
    providers: [AppRouteGuard]
})
export class RouteRoutingModule { }
