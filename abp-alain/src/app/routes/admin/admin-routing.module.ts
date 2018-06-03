import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AdminComponent } from './admin.component';
import { AppRouteGuard } from '@core/auth/app-route-guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { TenantListComponent } from './tenant/tenant-list/tenant-list.component';
const adminRoutes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivate: [AppRouteGuard],
  canActivateChild: [AppRouteGuard],
  children: [
    { path: 'tenants', component: TenantListComponent, data: { title: '租户' } },
    { path: 'users', component: UserListComponent, data: { title: '用户' } },
    { path: 'roles', component: RoleListComponent, data: { title: '角色' } }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
