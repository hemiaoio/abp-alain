import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
    selector: 'layout-passport',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.less'],
    providers: [SettingsService]
})
export class LayoutPassportComponent implements OnInit {
    ngOnInit(): void {
        this.description = this._settingService.app.description;
    }
    description: string;
    links = [
        {
            title: '帮助',
            href: ''
        },
        {
            title: '隐私',
            href: ''
        },
        {
            title: '条款',
            href: ''
        }
    ];
    constructor(private _settingService: SettingsService) {

    }

}
