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
    private imageUrls : Array<string>;
    private imagePrefix : string;
    private damContentUrl = Environments.property.DamContentUrl;
    private _pdfBaseUrl : string = `${Environments.property.ApiCallsBaseUrl}${Constants.accountsPdfUrl}`;
    private openPdfUrl : string;
    constructor ( private accountsListDataService : AccountsListDataService) {
    }
    public ngOnInit () : any {
        this.accounts = this.accountsListDataService.getAccounts();
        this.imageUrls = ['01.jpg', '02.jpg', '03.jpg'];
        this.imagePrefix = `${this.damContentUrl}enterprise-assets/ddc/bett3r/AMP_Bett3r_lockup_1_`;
        this.openPdfUrl = `${this._pdfBaseUrl}?id=${this.accountsListDataService.getPdfId()}&format=stream`;
        return undefined;
    }
    private getAccountPDF() {
        window.open( this.openPdfUrl, '_blank' );
    }
}
