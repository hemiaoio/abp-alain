import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { TenantDto, TenantServiceProxy, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@core/app-component-base';
import { AdSimpleTableConfig, SimpleTableColumn, SimpleTableComponent } from '@delon/abc';

@Component({
  selector: 'he-tenant-list',
  templateUrl: './tenant-list.component.html',
  styles: [],
  providers: [TenantServiceProxy]
})
export class TenantListComponent extends AppComponentBase implements OnInit {

  @ViewChild('st') st: SimpleTableComponent;
  tenants: TenantDto[];
  columns: SimpleTableColumn[] = [
    { title: 'Tenancy Name', index: 'tenancyName' },
    { title: 'Tenancy Name', index: '' },
    { title: 'Tenancy Name', index: '' },
    { title: 'Tenancy Name', index: '' }
  ];
  total: Number;

  isFullScreen: boolean = false;
  constructor(injector: Injector,
    private _tenantService: TenantServiceProxy,
    private _tableConfig: AdSimpleTableConfig) {
    super(injector);
  }

  ngOnInit() {
    console.log(this.st);
    this._tenantService.getAll(0, this.st.ps)
      .subscribe((result: PagedResultDtoOfTenantDto) => {
        this.tenants = result.items;
        this.total = result.totalCount;
      });
  }

  fullChange($event): void {
    this.isFullScreen = $event;
  }
}
