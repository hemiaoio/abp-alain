import { NgModule } from '@angular/core';
import { TenantComponent } from './tenant.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantRoutingModule } from './tenant-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TenantRoutingModule
  ],
  declarations: [TenantComponent, TenantListComponent]
})
export class TenantModule { }
