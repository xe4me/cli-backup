import {
    Component,
    ChangeDetectorRef,
    OnInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from 'amp-ddc-components';
import {AccountsListDataService} from '../../shared/accounts-list-data.service';
@Component( {
    selector        : 'accounts-list' ,
    templateUrl     : './accounts-list.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [ require( './accounts-list.component.scss').toString() ]
} )
export class AccountsListBlock implements OnInit {
    private accounts;
    constructor ( private _cd : ChangeDetectorRef, private accountsListDataService : AccountsListDataService) {
    }

    public ngOnInit () : any {
        this.accountsListDataService
            .getAccounts()
            .subscribe( ( res : any ) => {
                this.accounts = res;
            } , ( error : any ) => {
            } );
        return undefined;
    }
}
