import { UserEditComponent } from './../user-edit/user-edit.component';
import { Component, OnInit, Injector, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { AppComponentBase } from '@core/app-component-base';
import { NzModalService } from 'ng-zorro-antd';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { SimpleTableComponent, SimpleTableColumn } from '@delon/abc';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'he-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  providers: [UserServiceProxy]
})
export class UserListComponent extends AppComponentBase implements OnInit {
  isFullScreen: Boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 1;
  users: UserDto[];
  loading: boolean = false;
  constructor(injector: Injector,
    private _modalService: NzModalService,
    private _userService: UserServiceProxy) {
    super(injector);

  }

  ngOnInit() {
    this.loadData();
  }

  fullChange($event: boolean): void {
    this.isFullScreen = $event;
    if ($event) {
      this.pageSize = 20;
    } else {
      this.pageSize = 10;
    }
  }

  createUser($event): void {
    const createModal = this._modalService.create({
      nzFooter: null,
      nzWrapClassName: 'modal-lg',
      nzContent: UserCreateComponent
    });
    createModal.afterClose.subscribe((result: UserDto) => {
      this.loadData();
    });
  }

  loadData(isReset: boolean = false): void {
    if (isReset) {
      this.pageIndex = 1;
    }
    const skipCount = (this.pageIndex - 1) * this.pageSize;
    this.loading = true;
    this._userService.getAll(skipCount, this.pageSize)
      .subscribe(
        (result: PagedResultDtoOfUserDto) => {
          this.users = result.items;
          this.total = result.totalCount;
        },
        () => { },
        () => {
          this.loading = false;
        });
  }

  changeStatus(data: UserDto): void {
    data.isActive = !data.isActive;
  }

  edit(data: UserDto): void {
    const editModal = this._modalService.create({
      nzFooter: null,
      nzWrapClassName: 'modal-lg',
      nzContent: UserEditComponent,
      nzComponentParams: {
        user: data
      }
    });
    editModal.afterClose.subscribe((result: UserDto) => {
      this.loadData();
    });
  }

  del(data: UserDto): void {
    this._userService.delete(data.id).subscribe(() => {
      this.loadData();
    });
  }
}

