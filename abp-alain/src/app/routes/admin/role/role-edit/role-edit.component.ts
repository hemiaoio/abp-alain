import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '@core/app-component-base';
import { RoleServiceProxy, RoleDto, PermissionDto, ListResultDtoOfPermissionDto, CreateRoleDto } from '@shared/service-proxies/service-proxies';
import { NzModalRef } from 'ng-zorro-antd';
import { PermissionDtoForSelect } from '../permission-dto-for-select';
import { from, concat } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css'],
  providers: [RoleServiceProxy]
})
export class RoleEditComponent extends AppComponentBase implements OnInit {

  @Input()
  role: RoleDto;

  allPerssionsChecked: boolean = false;
  loading: boolean = false;
  indeterminate: boolean = false;
  permissions: PermissionDtoForSelect[];
  roleEditForm: FormGroup;

  constructor(injector: Injector,
    private roleService: RoleServiceProxy,
    private modal: NzModalRef,
    private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit() {

    this.roleEditForm = this.fb.group({
      name: [this.role.name, [Validators.required]],
      displayName: [this.role.displayName, [Validators.required]],
      description: [this.role.description],
      id: [this.role.id]
    });
    this.resolvePermissions();
  }

  resolvePermissions(): void {
    this.loading = true;
    this.roleService
      .getAllPermissions()
      .subscribe((result: ListResultDtoOfPermissionDto) => {
        this.permissions = result.items.map((item: PermissionDto) => {
          const per = new PermissionDtoForSelect(item);
          per.checked = this.role.permissions.includes(item.name);
          return per;
        });
      },
        () => { },
        () => {
          this.loading = false;
        });
  }


  _submitForm($event: any, role: RoleDto): void {
    role.permissions = [];
    from(this.permissions)
      .filter((item: PermissionDtoForSelect) => {
        return item.checked;
      })
      .pipe(pluck<PermissionDtoForSelect, string>('name'))
      .subscribe((result: string) => {
        role.permissions.push(result);
      });
    this.roleService.update(role).subscribe(
      (result: RoleDto) => {
        this.modal.close(result);
        this.cancel($event);
      }
    );
  }

  cancel($event: any): void {
    this.modal.destroy();
  }

  updateAllChecked($event): void {
    this.indeterminate = false;
    if (this.allPerssionsChecked) {
      this.permissions.forEach((item: PermissionDtoForSelect) => item.checked = true);
    } else {
      this.permissions.forEach((item: PermissionDtoForSelect) => item.checked = false);
    }
  }

  permissionChanged($event): void {
    if (this.permissions.every((item: PermissionDtoForSelect) => item.checked === false)) {
      this.allPerssionsChecked = false;
      this.indeterminate = false;
    } else if (this.permissions.every((item: PermissionDtoForSelect) => item.checked === true)) {
      this.allPerssionsChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
}
