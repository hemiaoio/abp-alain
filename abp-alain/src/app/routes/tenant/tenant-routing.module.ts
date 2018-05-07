import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantComponent } from './tenant.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { AppRouteGuard } from '@core/auth/app-route-guard';


const routes: Routes = [
    {
        path: '',
        component: TenantComponent,
        canActivate: [AppRouteGuard],
        canActivateChild: [AppRouteGuard],
        children: [
            { path: 'list', component: TenantListComponent, data: { title: '租户' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TenantRoutingModule { }
