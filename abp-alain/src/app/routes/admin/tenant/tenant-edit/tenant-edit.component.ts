import { Component, OnInit, Injector, Input } from '@angular/core';
import { TenantDto, TenantServiceProxy } from '@shared/service-proxies/service-proxies';
import { NzModalRef } from 'ng-zorro-antd';
import { AppComponentBase } from '@core/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'he-tenant-edit',
  templateUrl: './tenant-edit.component.html',
  styles: [],
  providers: [TenantServiceProxy]
})
export class TenantEditComponent extends AppComponentBase implements OnInit {
  @Input() record: TenantDto;
  tenantEditForm: FormGroup;
  constructor(injector: Injector,
    private modal: NzModalRef,
    private fb: FormBuilder,
    private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.tenantEditForm = this.fb.group({
      tenancyName: [this.record.tenancyName, [Validators.required]],
      name: [this.record.name, [Validators.required]],
      isActive: [this.record.isActive],
      id: [this.record.id]
    });
  }
  _submitForm($event, formValue: TenantDto) {
    this._tenantService.update(formValue).subscribe(() => {
      this.modal.close(formValue);
      this.cancel();
    });
  }

  cancel() {
    this.modal.destroy();
  }
}
