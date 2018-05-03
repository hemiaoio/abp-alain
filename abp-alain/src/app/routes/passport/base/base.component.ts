import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'passport-base',
  templateUrl: './base.component.html',
  styles: []
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showTenantChange(): boolean {
    return abp.multiTenancy.isEnabled;
  }
}
