import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@core/app-component-base';
import { NzModalRef } from 'ng-zorro-antd';
import { RoleServiceProxy, CreateRoleDto, RoleDto, ListResultDtoOfPermissionDto, PermissionDto } from '@shared/service-proxies/service-proxies';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, concat } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { PermissionDtoForSelect } from '../permission-dto-for-select';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
  providers: [RoleServiceProxy]
})
export class RoleCreateComponent extends AppComponentBase implements OnInit {

  roleCreateForm: FormGroup;
  createRoleDto: CreateRoleDto;
  permissions: PermissionDtoForSelect[];
  indeterminate: boolean = false;
  allPerssionsChecked: boolean = false;
  constructor(injector: Injector,
    private modal: NzModalRef,
    private roleService: RoleServiceProxy,
    private fb: FormBuilder) {
    super(injector);
    this.createRoleDto = new CreateRoleDto({
      name: '',
      displayName: '',
      normalizedName: '',
      description: '',
      isStatic: false,
      permissions: []
    });
    this.roleCreateForm = fb.group({
      name: [this.createRoleDto.name, [Validators.required]],
      displayName: [this.createRoleDto.displayName, [Validators.required]],
      description: [this.createRoleDto.description]
    });
  }

  ngOnInit() {
    this.resolvePermissions();
  }

  resolvePermissions(): void {
    this.roleService.getAllPermissions()
      .subscribe((permissionResult: ListResultDtoOfPermissionDto) => {
        this.permissions = permissionResult.items.map((item: any) => {
          item.checked = false;
          return item;
        });
      });
  }

  _submitForm($event: any, role: CreateRoleDto): void {
    role.permissions = [];
    from(this.permissions)
      .filter((item: PermissionDtoForSelect) => {
        return item.checked;
      })
      .pipe(pluck<PermissionDtoForSelect, string>('name'))
      .subscribe((result: string) => {
        role.permissions.push(result);
      });
    this.roleService.create(role)
      .subscribe(
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
