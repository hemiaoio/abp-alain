import { Injectable } from '@angular/core';
import { ITokenService, ITokenModel, JWTTokenModel } from '@delon/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { share } from 'rxjs/operators';

@Injectable()
export class AbpTokenService implements ITokenService {

    private _change = new BehaviorSubject(null);
    set(data: ITokenModel): boolean {
        this._change.next(data);
        abp.auth.setToken(data.token);
        return true;
    }

    get(type?: any): ITokenModel;
    get<T extends ITokenModel>(type?: any): T;
    get(type?: any) {
        const tokenModel = new JWTTokenModel();
        tokenModel.token = abp.auth.getToken();
        return tokenModel;
    }
    clear(): void {
        this._change.next(null);
        abp.auth.clearToken();
    }
    change(): Observable<ITokenModel> {
        return this._change.pipe(share());
    }
    login_url: string;
    redirect: string;
    constructor() {
        this.login_url = 'passport/login';
    }

}
