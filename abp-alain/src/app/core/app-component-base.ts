import { AppSessionService } from '@core/session/app-session.service';
import { Injector } from '@angular/core';

export class AppComponentBase {
    appSession: AppSessionService;
    constructor(injector: Injector) {
        this.appSession = injector.get(AppSessionService);
    }
}
