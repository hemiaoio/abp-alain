import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// ngzorro
import { NzSchemaFormModule } from 'nz-schema-form';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';

// region: third libs
import { CountdownModule } from 'ngx-countdown';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule,
    NzSchemaFormModule
];
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
        DelonABCModule.forRoot(),
        DelonACLModule.forRoot(),
        // third libs
        NgZorroAntdModule.forRoot(),
        CountdownModule,
        NzSchemaFormModule.forRoot()
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonABCModule,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ]
})
export class SharedModule { }
