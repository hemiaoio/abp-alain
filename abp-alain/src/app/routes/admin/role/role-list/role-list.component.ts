import { Component, OnInit, Injector } from '@angular/core';
import { RoleServiceProxy, PagedResultDtoOfRoleDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@core/app-component-base';
import { NzModalService } from 'ng-zorro-antd';
import { RoleEditComponent } from '../role-edit/role-edit.component';
import { RoleCreateComponent } from '../role-create/role-create.component';

@Component({
  selector: 'he-role-list',
  templateUrl: './role-list.component.html',
  styles: [],
  providers: [RoleServiceProxy]
})
export class RoleListComponent extends AppComponentBase implements OnInit {

  isFullScreen: boolean = false;
  pageSize: number = 10;
  pageIndex: number = 1;
  total: number = 0;
  loading: boolean = false;
  datas: RoleDto[];
  constructor(injector: Injector,
    private roleService: RoleServiceProxy,
    private modalService: NzModalService) {
    super(injector);
  }

  ngOnInit() {
    this.loadData();
  }

  //#region view operators
  fullChange($event: boolean): void {
    this.isFullScreen = $event;
    if ($event) {
      this.pageSize = 20;
    } else {
      this.pageSize = 10;
    }
  }
  //#endregion

  //#region data operators
  loadData(isReload: boolean = false): void {
    if (isReload) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.roleService.getAll(this.pageSize * (this.pageIndex - 1), this.pageSize)
      .subscribe(
        (result: PagedResultDtoOfRoleDto) => {
          this.datas = result.items;
          this.total = result.totalCount;
        },
        () => { },
        () => {
          this.loading = false;
        });
  }

  edit(role: RoleDto): void {
    const editModal = this.modalService.create({
      nzComponentParams: {
        role: role
      },
      nzContent: RoleEditComponent,
      nzFooter: null,
      nzWrapClassName: 'modal-lg'
    });

    editModal.afterClose.subscribe(() => {
      this.loadData();
    });
  }

  del(role: RoleDto): void {
    this.roleService.delete(role.id)
      .subscribe(() => {
        this.loadData();
      });
  }

  create($event: any): void {
    const createModal = this.modalService.create({
      nzContent: RoleCreateComponent,
      nzFooter: null,
      nzWrapClassName: 'modal-lg'
    });

    createModal.afterClose.subscribe(() => {
      this.loadData();
    });
  }
  //#endregion
}
