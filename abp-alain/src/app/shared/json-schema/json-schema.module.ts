import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

// import { TinymceWidget } from './widgets/tinymce/tinymce.widget';
// import { UEditorWidget } from './widgets/ueditor/ueditor.widget';

export const SCHEMA_THIRDS_COMPONENTS = [
    // TinymceWidget,
    // UEditorWidget
];

@NgModule({
    declarations: SCHEMA_THIRDS_COMPONENTS,
    entryComponents: SCHEMA_THIRDS_COMPONENTS,
    imports: [
        SharedModule
    ],
    exports: [
        ...SCHEMA_THIRDS_COMPONENTS
    ]
})
export class JsonSchemaModule {
    constructor() {
    }
}
