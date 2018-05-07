import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AdminComponent } from './admin.component';
import { AppRouteGuard } from '@core/auth/app-route-guard';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';
const adminRoutes: Routes = [{
    path: '',
    component: AdminComponent,
    canActivate: [AppRouteGuard],
    canActivateChild: [AppRouteGuard],
    children: [
        { path: 'users', component: UserListComponent },
        { path: 'roles', component: RoleListComponent }
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
