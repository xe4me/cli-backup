import {
    Component,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    Environments
} from 'amp-ddc-components';
import {
    Constants,
    AccountsListDataService
} from '../../shared';
import {
    AccountsListPipe
} from './accounts-list.pipe';

@Component( {
    selector        : 'accounts-list' ,
    templateUrl     : './accounts-list.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [ require( './accounts-list.component.scss').toString() ],
    pipes: [AccountsListPipe]
} )

export class AccountsListBlock implements OnInit {
    private accounts : Array<any>;
    private _pdfBaseUrl : string = `${Environments.property.ApiCallsBaseUrl}${Constants.accountsPdfUrl}`;
    private openPdfUrl : string;
    constructor ( private accountsListDataService : AccountsListDataService) {
    }
    public ngOnInit () : any {
        this.accounts = this.accountsListDataService.getAccounts();
        this.openPdfUrl = `${this._pdfBaseUrl}?id=${this.accountsListDataService.getPdfId()}&format=stream`;
        return undefined;
    }
    private getAccountPDF() {
        window.open( this.openPdfUrl, '_blank' );
    }
}
