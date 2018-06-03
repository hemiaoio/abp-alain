import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@core/app-component-base';
import { NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TenantServiceProxy, CreateTenantDto, TenantDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'he-tenant-create',
  templateUrl: './tenant-create.component.html',
  styles: [],
  providers: [
    TenantServiceProxy
  ]
})
export class TenantCreateComponent extends AppComponentBase implements OnInit {
  tenantCreateForm: FormGroup;
  createDto: CreateTenantDto;
  constructor(injector: Injector,
    private modal: NzModalRef,
    private fb: FormBuilder,
    private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.createDto = new CreateTenantDto();
    this.tenantCreateForm = this.fb.group({
      tenancyName: [this.createDto.tenancyName, [Validators.required]],
      name: [this.createDto.name, [Validators.required]],
      adminEmailAddress: [this.createDto.adminEmailAddress, [Validators.required, Validators.email]],
      connectionString: [this.createDto.connectionString],
      isActive: [this.createDto.isActive]
    });
  }

  _submitForm($event, formValue: CreateTenantDto): void {
    this._tenantService
      .create(formValue)
      .subscribe((result: TenantDto) => {
        this.modal.close(result);
        this.cancel();
      });
  }

  cancel(): void {
    this.modal.destroy();
  }
}


