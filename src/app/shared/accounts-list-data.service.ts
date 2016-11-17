import {
    Injectable
} from '@angular/core';
@Injectable()
export class AccountsListDataService {
    public _accounts : Array<any>;
    private _isNormal : Boolean = true;
    private _pdfId : string;

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
    public getAccounts() : Array<any> {
        return this._accounts;
    }
    public setPdfId(id) : void {
        this._pdfId = id;
    }
    public getPdfId() : string {
        return this._pdfId;
    }
}
