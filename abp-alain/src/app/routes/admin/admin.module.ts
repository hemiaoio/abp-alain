import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent,
    UserListComponent,
    RoleListComponent
  ]
})
export class AdminModule { }
