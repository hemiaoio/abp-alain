import { Component, OnInit, ViewChild, Injector, Input } from '@angular/core';
import { AppComponentBase } from '@core/app-component-base';
import { TenantChangeModalComponent } from '../tenant-change-modal/tenant-change-modal.component';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'he-tenant-change',
  templateUrl: './tenant-change.component.html',
  styleUrls: ['tenant-change.component.less'],
  providers: [AccountServiceProxy]
})
export class TenantChangeComponent extends AppComponentBase implements OnInit {
  isMultiTenancyEnabled: boolean;
  tenancyName: string;
  name: string;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _modalService: NzModalService) {
    super(injector);
  }
  ngOnInit() {
    if (this.appSession.tenant) {
      this.tenancyName = this.appSession.tenant.tenancyName;
      this.name = this.appSession.tenant.name;
    }
    this.isMultiTenancyEnabled = abp.multiTenancy.isEnabled;
  }

  showChangeModal(): void {
    const subscription = this._modalService.open({
      title: '变更租户',
      content: TenantChangeModalComponent,
      onOk() {
        return this.appSession.init();
      },
      onCancel() {
      },
      footer: false
    });
  }
}
