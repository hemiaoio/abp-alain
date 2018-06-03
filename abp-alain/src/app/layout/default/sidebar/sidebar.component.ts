import { AppComponentBase } from '@core/app-component-base';
import { extend } from '@core/utils/extend';
import { Component, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent extends AppComponentBase {
  constructor(injector: Injector,
    public settings: SettingsService,
    public msgSrv: NzMessageService) {
    super(injector);
  }
}
