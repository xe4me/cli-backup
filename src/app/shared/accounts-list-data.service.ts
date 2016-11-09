import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AccountsListDataService {
    public _accounts : Array<any>;
    private _isNormal : Boolean = true;
    constructor() {
    }

    public setAccounts( accounts ) {
        this._accounts = accounts;
    }
    public isNormal() {
        this._accounts.forEach((account) => {
            if (account.transactionalStatus !== 'Normal') {
                this._isNormal = false;
                return false;
            }
        });
        return this._isNormal;
    }
    public getAccounts() {
        return this._accounts;
    }
}
