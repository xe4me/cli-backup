import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AccountsListDataService {
    public _accounts : Observable<any[]>;
    private _isNormal = true;
    constructor() {
    }

    public setAccounts( accounts ) {
        this._accounts = Observable.of( accounts );
        console.log(this._accounts);
    }
    public isNormal() {
        this._accounts
            .subscribe((data) => {
                data.forEach((account) => {
                    if(account.transactionalStatus != 'Normal'){
                        this._isNormal = false;
                        return false;
                    }
                });
            });
        return this._isNormal;
}
    public getAccounts() {
        return this._accounts;
    }
}
