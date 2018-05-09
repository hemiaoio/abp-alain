import { AccountServiceProxy, IsTenantAvailableInput } from '@shared/service-proxies/service-proxies';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '@core/app-component-base';
import { NzModalRef } from 'ng-zorro-antd';
import { AppTenantAvailabilityState } from '@core/enums/app-tenant-availability-state';

@Component({
  selector: 'he-tenant-change-modal',
  templateUrl: './tenant-change-modal.component.html',
  styleUrls: ['./tenant-change-modal.component.less'],
  providers: [AccountServiceProxy]
})
export class TenantChangeModalComponent extends AppComponentBase implements OnInit {
  tenancyName: string = '';
  loading: boolean = false;
  error: string = '';
  constructor(injector: Injector, private modal: NzModalRef, private _accountService: AccountServiceProxy) {
    super(injector);
  }

  ngOnInit() {

  }

  handleClose(): void {
    this.modal.destroy('onCancel');
  }
  submit(): void {
    if (!this.tenancyName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      this.modal.destroy({ tenancyName: null });
      return;
    }
    this.loading = true;
    const input = new IsTenantAvailableInput();
    input.tenancyName = this.tenancyName;
    this._accountService.isTenantAvailable(input)
      .finally(() => { this.loading = false; })
      .subscribe((result) => {
        switch (result.state) {
          case AppTenantAvailabilityState.Available:
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            this.modal.destroy({ tenancyName: this.tenancyName });
            return;
          case AppTenantAvailabilityState.InActive:
            this.error = `租户` + this.tenancyName + `尚未激活！`;
            break;
          case AppTenantAvailabilityState.NotFound: // NotFound
            this.error = `租户` + this.tenancyName + `不存在！`;
            break;
        }
      });
  }
}
