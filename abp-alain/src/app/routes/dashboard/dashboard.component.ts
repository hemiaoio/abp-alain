import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { format } from 'date-fns';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    constructor(private http: _HttpClient, public msg: NzMessageService) { }

    todoData: any[] = [
        {
            completed: true,
            avatar: '1',
            name: '苏先生',
            content: `请告诉我，我应该说点什么好？`,
        },
        {
            completed: false,
            avatar: '2',
            name: 'はなさき',
            content: `ハルカソラトキヘダツヒカリ`,
        },
        {
            completed: false,
            avatar: '3',
            name: 'cipchk',
            content: `this world was never meant for one as beautiful as you.`,
        },
        {
            completed: false,
            avatar: '4',
            name: 'Kent',
            content: `my heart is beating with hers`,
        },
        {
            completed: false,
            avatar: '5',
            name: 'Are you',
            content: `They always said that I love beautiful girl than my friends`,
        },
        {
            completed: false,
            avatar: '6',
            name: 'Forever',
            content: `Walking through green fields ，sunshine in my eyes.`,
        },
    ];

    webSite: any[] = [];
    salesData: any[] = [];
    offlineChartData: any[] = [];

    ngOnInit() {
        for (let i = 0; i < 12; i += 1) {
            this.salesData.push({
                x: `${i + 1}月`,
                y: Math.floor(Math.random() * 1000) + 200,
            });
        }
        const beginDay = new Date().getTime();

        const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
        for (let i = 0; i < fakeY.length; i += 1) {
            this.webSite.push({
                x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'),
                y: fakeY[i],
            });
        }


        for (let i = 0; i < 20; i += 1) {
            this.offlineChartData.push({
                x: new Date().getTime() + 1000 * 60 * 30 * i,
                y1: Math.floor(Math.random() * 100) + 10,
                y2: Math.floor(Math.random() * 100) + 10,
            });
        }
        // this.http.get('/chart').subscribe((res: any) => {
        //     this.webSite = res.visitData.slice(0, 10);
        //     this.salesData = res.salesData;
        //     this.offlineChartData = res.offlineChartData;
        // });
    }

}
