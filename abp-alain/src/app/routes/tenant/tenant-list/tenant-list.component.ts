import { Component, OnInit, Injector } from '@angular/core';
import { TenantDto, TenantServiceProxy, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@core/app-component-base';
import { AdSimpleTableConfig, SimpleTableColumn } from '@delon/abc';

@Component({
  selector: 'he-tenant-list',
  templateUrl: './tenant-list.component.html',
  styles: [],
  providers: [TenantServiceProxy]
})
export class TenantListComponent extends AppComponentBase implements OnInit {

  tenants: TenantDto[];
  columns: SimpleTableColumn[] = [
    { title: 'Tenancy Name' },
    { title: 'Tenancy Name' },
    { title: 'Tenancy Name' },
    { title: 'Tenancy Name' }
  ];
  total: Number;

  isFullScreen: boolean = false;
  constructor(injector: Injector, private _tenantService: TenantServiceProxy, private _tableConfig: AdSimpleTableConfig) {
    super(injector);
  }

  ngOnInit() {
    this._tenantService.getAll(0, this._tableConfig.ps)
      .subscribe((result: PagedResultDtoOfTenantDto) => {
        this.tenants = result.items;
        this.total = result.totalCount;
      });
  }

  fullChange($event): void {
    this.isFullScreen = $event;
  }
}
