import { NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@core/app-component-base';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { UserDto, UserServiceProxy, ListResultDtoOfRoleDto, RoleDto, IRoleDto } from '@shared/service-proxies/service-proxies';
import { from } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserServiceProxy]
})
export class UserEditComponent extends AppComponentBase implements OnInit {
  @Input() user: UserDto;
  userDetailForm: FormGroup;
  indeterminate: boolean = false;
  roles: RoleDtoWithChecked[];
  allRolesChecked: boolean = false;
  constructor(injector: Injector,
    private fb: FormBuilder,
    private userService: UserServiceProxy,
    private modal: NzModalRef) {
    super(injector);

  }

  ngOnInit() {
    this.userDetailForm = this.fb.group({
      userName: [this.user.userName, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      surname: [this.user.surname, [Validators.required]],
      emailAddress: [this.user.emailAddress, [Validators.required, Validators.email]],
      isActive: [this.user.isActive],
      roleNames: [this.user.roleNames],
      id: [this.user.id]
    });

    this.userService.getRoles().subscribe((result: ListResultDtoOfRoleDto) => {
      this.roles = result.items.map((item: RoleDtoWithChecked) => {
        item.checked = this.user.roleNames.indexOf(item.normalizedName) > -1;
        return item;
      });
      for (let i = 0; i < 20; i++) {
        const item = new RoleDtoWithChecked({
          name: this.roles[0].displayName + i,
          displayName: this.roles[0].displayName + i,
          normalizedName: this.roles[0].normalizedName + i,
          checked: false
        });
        this.roles.push(item);
      }
    });
  }

  _submitForm($event: any, user: UserDto): void {
    user.roleNames = [];
    from(this.roles).filter((item: any) => {
      return item.checked;
    }).map((item: any) => {
      return item.normalizedName;
    }).subscribe(result => {
      user.roleNames.push(result);
    });
    this.userService
      .update(user)
      .subscribe(() => {
        this.modal.close(user);
        this.cancel($event);
      });
  }

  updateAllChecked($event): void {
    this.indeterminate = false;
    if (this.allRolesChecked) {
      this.roles.forEach((item: any) => item.checked = true);
    } else {
      this.roles.forEach((item: any) => item.checked = false);
    }
  }
  roleChange($event: any): void {
    if (this.roles.every((item: any) => item.checked === false)) {
      this.allRolesChecked = false;
      this.indeterminate = false;
    } else if (this.roles.every((item: any) => item.checked === true)) {
      this.allRolesChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  cancel($event): void {
    this.modal.destroy();
  }
}


class RoleDtoWithChecked extends RoleDto {
  checked: boolean = false;

  constructor(data?: any) {
    super(data);
    this.checked = data['checked'];
  }
}
