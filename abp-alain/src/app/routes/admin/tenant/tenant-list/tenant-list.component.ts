import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { TenantDto, TenantServiceProxy, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@core/app-component-base';
import { AdSimpleTableConfig, SimpleTableColumn, SimpleTableComponent, SimpleTableChange } from '@delon/abc';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { TenantEditComponent } from '../tenant-edit/tenant-edit.component';
import { ArgumentType } from '@angular/core/src/view';
import { TenantCreateComponent } from '../tenant-create/tenant-create.component';

@Component({
  selector: 'he-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.less'],
  providers: [TenantServiceProxy]
})
export class TenantListComponent extends AppComponentBase implements OnInit {

  @ViewChild('st') st: SimpleTableComponent;
  tenants: TenantDto[];
  columns: SimpleTableColumn[] = [
    { title: 'Tenancy Name', index: 'tenancyName' },
    { title: 'Display Name', index: 'name' },
    {
      title: 'IsActive',
      index: 'isActive',
      type: 'yn',
      ynYes: '<i class="anticon anticon-check"></i>',
      ynNo: '<i class="anticon anticon-close"></i>',
    },
    {
      title: 'Actions', buttons: [
        {
          text: '<i class="anticon anticon-edit"></i>Edit',
          type: 'modal',
          component: TenantEditComponent,
          click: (record: TenantDto, modal: any) => {
            console.log(record);
            console.log(modal);
            this.loadData(this.st.pi);
          }
        },
        {
          text: '<i class="anticon anticon-delete"></i>Delete',
          type: 'del',
          pop: true,
          click: (record: TenantDto) => {
            this._tenantService
              .delete(record.id)
              .subscribe(
                () => {
                  this._message.success(`成功删除【${record.name}】`);
                },
                () => { },
                () => {
                  this.loadData(this.st.pi);
                });
          },
        }
      ]
    }
  ];
  total: Number;

  isFullScreen: boolean = false;
  constructor(injector: Injector,
    private _tenantService: TenantServiceProxy,
    private _tableConfig: AdSimpleTableConfig,
    private _message: NzMessageService,
    private _modalService: NzModalService) {
    super(injector);
  }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(pageIndex: number): void {
    const skipCount = (pageIndex - 1) * this.st.ps;
    this._tenantService.getAll(skipCount, this.st.ps)
      .subscribe((result: PagedResultDtoOfTenantDto) => {
        this.tenants = result.items;
        this.total = result.totalCount;
      });
  }


  pageChanged($event: SimpleTableChange): void {
    this.loadData($event.pi);
  }

  fullChange($event): void {
    this.isFullScreen = $event;
  }

  createTenant($event): void {
    const createModal = this._modalService.create({
      nzContent: TenantCreateComponent,
      nzFooter: null,
      nzWrapClassName: 'modal-lg'
    });
    createModal.afterClose.subscribe(() => {
      this.loadData(this.st.pi);
    });
  }

  refresh($event): void {
    this.loadData(1);
  }
}
