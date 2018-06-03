import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// region: third libs
import { CountdownModule } from 'ngx-countdown';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IsActivePipe } from './pipes/is-active/is-active.pipe';
const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule
];
// endregion

// region: Pipes
const PIPES = [IsActivePipe];
// endregion

// region: your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [];
// endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonABCModule,
        DelonACLModule,
        DelonFormModule,
        // third libs
        ...THIRDMODULES,
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonABCModule,
        DelonACLModule,
        DelonFormModule,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ]
})
export class SharedModule { }
