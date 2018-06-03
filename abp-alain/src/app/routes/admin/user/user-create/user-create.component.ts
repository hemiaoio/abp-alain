import { NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { UserServiceProxy, CreateUserDto, UserDto, RoleDto, ListResultDtoOfRoleDto, IRoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@core/app-component-base';
import { Component, OnInit, Injector, Input, EventEmitter } from '@angular/core';
import { Observable, from } from 'rxjs';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'he-user-create',
  templateUrl: './user-create.component.html',
  styles: [],
  providers: [UserServiceProxy]
})
export class UserCreateComponent extends AppComponentBase implements OnInit {
  userDetailForm: FormGroup;
  createUserDto: CreateUserDto;
  saving: boolean = false;
  roles: RoleDto[];
  allRolesChecked = false;
  indeterminate = false;
  constructor(injector: Injector,
    private _userService: UserServiceProxy,
    private _fb: FormBuilder,
    private _modal: NzModalRef) {
    super(injector);
    this.createUserDto = new CreateUserDto({
      userName: '',
      name: '',
      surname: '',
      emailAddress: '',
      password: '',
      isActive: false,
      roleNames: []
    });
    this.userDetailForm = this._fb.group({
      userName: [this.createUserDto.userName, [Validators.required]],
      name: [this.createUserDto.name, [Validators.required]],
      surname: [this.createUserDto.surname, [Validators.required]],
      emailAddress: [this.createUserDto.emailAddress, [Validators.required, Validators.email], this.validationEmailExisting.bind(this)],
      isActive: [this.createUserDto.isActive],
      roleNames: [this.createUserDto.roleNames],
      password: [this.createUserDto.password, [Validators.required]],
      confirmPassword: ['', [this.confirmationValidator.bind(this)]]
    });
  }

  confirmationValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value || control.value.length === 0) {
      return { 'required': true, 'error': true };
    } else if (control.value !== this.userDetailForm.controls.password.value) {
      return { 'confirm': true, 'error': true };
    }
    return null;
  }

  validationEmailExisting(control: FormControl): Observable<{ [s: string]: boolean }> {
    return Observable.of(null);
  }

  updateConfirmValidator = ($event): void => {
    setTimeout(() => this.userDetailForm.controls.confirmPassword.updateValueAndValidity());
  }

  ngOnInit() {
    this._userService.getRoles().subscribe(
      (result: ListResultDtoOfRoleDto) => {
        this.roles = result.items;
        for (let i = 0; i < 100; i++) {
          const item = new RoleDto({
            name: this.roles[0].displayName + i,
            displayName: this.roles[0].displayName + i,
            normalizedName: this.roles[0].normalizedName + i,
          } as IRoleDto);
          this.roles.push(item);
        }
      }
    );
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
  _submitForm = ($event: any, createUserDto: CreateUserDto): void => {
    from(this.roles)
      .filter((item: any) => {
        return item.checked;
      })
      .map((item: any) => {
        return item.normalizedName;
      })
      .mergeMap((roleNames: string[]) => {
        createUserDto.roleNames = roleNames;
        return this._userService
          .create(createUserDto);
      })
      .subscribe((result: UserDto) => {
        this._modal.close(result);
        this.cancel($event);
      });
  }

  cancel = (e: any): void => {
    this._modal.destroy();
  }
}
