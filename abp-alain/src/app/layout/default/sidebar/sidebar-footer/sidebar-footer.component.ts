import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@core/app-component-base';

@Component({
  selector: 'he-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.less']
})
export class SidebarFooterComponent extends AppComponentBase implements OnInit {
  currentYear: Number;
  versionText: String;
  constructor(injector: Injector) {
    super(injector);
    this.currentYear = new Date().getFullYear();
    this.versionText = this.appSession.application.version + ' [' + this.appSession.application.releaseDate.format('YYYYDDMM') + ']';
  }

  ngOnInit() {
  }

}
