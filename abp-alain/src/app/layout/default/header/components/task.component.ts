import { Component } from '@angular/core';

@Component({
  selector: 'header-task',
  template: `
  <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" (nzVisibleChange)="change()">
    <div class="item" nz-dropdown>
        <nz-badge [nzDot]="true">
            <i class="anticon anticon-bell"></i>
        </nz-badge>
    </div>
    <div nz-menu class="wd-lg">
        <nz-card nzTitle="Notifications" [nzLoading]="loading" class="ant-card__body-nopadding" [nzExtra]="extra" [nzCover]="cover">
            <ng-template #extra>
                <i class="anticon anticon-plus"></i>
            </ng-template>
            <nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="py-sm bg-grey-lighter-h point">
                <nz-col [nzSpan]="4" class="text-center">
                    <nz-avatar [nzSrc]="'./assets/img/1.png'"></nz-avatar>
                </nz-col>
                <nz-col [nzSpan]="20">
                    <strong>cipchk</strong>
                    <p class="mb0">Please tell me what happened in a few words, don't go into details.</p>
                </nz-col>
            </nz-row>
            <nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="py-sm bg-grey-lighter-h point">
                <nz-col [nzSpan]="4" class="text-center">
                    <nz-avatar [nzSrc]="'./assets/img/2.png'"></nz-avatar>
                </nz-col>
                <nz-col [nzSpan]="20">
                    <strong>はなさき</strong>
                    <p class="mb0">ハルカソラトキヘダツヒカリ</p>
                </nz-col>
            </nz-row>
            <nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="py-sm bg-grey-lighter-h point">
                <nz-col [nzSpan]="4" class="text-center">
                    <nz-avatar [nzSrc]="'./assets/img/3.png'"></nz-avatar>
                </nz-col>
                <nz-col [nzSpan]="20">
                    <strong>苏先生</strong>
                    <p class="mb0">请告诉我，我应该说点什么好？</p>
                </nz-col>
            </nz-row>
            <nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="py-sm bg-grey-lighter-h point">
                <nz-col [nzSpan]="4" class="text-center">
                    <nz-avatar [nzSrc]="'./assets/img/4.png'"></nz-avatar>
                </nz-col>
                <nz-col [nzSpan]="20">
                    <strong>Kent</strong>
                    <p class="mb0">Please tell me what happened in a few words, don't go into details.</p>
                </nz-col>
            </nz-row>
            <nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="py-sm bg-grey-lighter-h point">
                <nz-col [nzSpan]="4" class="text-center">
                    <nz-avatar [nzSrc]="'./assets/img/5.png'"></nz-avatar>
                </nz-col>
                <nz-col [nzSpan]="20">
                    <strong>Jefferson</strong>
                    <p class="mb0">Please tell me what happened in a few words, don't go into details.</p>
                </nz-col>
            </nz-row>
            <nz-row class="pt-lg pb-lg">
                <nz-col [nzSpan]="24" class="border-top-1 text-center text-grey point">See All</nz-col>
            </nz-row>
        </nz-card>
    </div>
</nz-dropdown>
  `,
})
export class HeaderTaskComponent {
  loading = true;

  change() {
    setTimeout(() => (this.loading = false), 500);
  }
}
