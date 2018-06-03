
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { TenantListComponent } from './tenant/tenant-list/tenant-list.component';
import { TenantEditComponent } from './tenant/tenant-edit/tenant-edit.component';
import { TenantCreateComponent } from './tenant/tenant-create/tenant-create.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleCreateComponent } from './role/role-create/role-create.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    TenantListComponent,
    TenantCreateComponent,
    TenantEditComponent,
    RoleListComponent,
    RoleCreateComponent,
    RoleEditComponent
  ],
  entryComponents: [
    TenantCreateComponent,
    TenantEditComponent,
    UserCreateComponent,
    UserEditComponent,
    RoleCreateComponent,
    RoleEditComponent
  ]
})
export class AdminModule { }
