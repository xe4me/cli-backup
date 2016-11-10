import {
    Component,
    ChangeDetectorRef,
    OnInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import {
    Environments
} from 'amp-ddc-components';
import {AccountsListDataService} from '../../shared/accounts-list-data.service';
@Component( {
    selector        : 'accounts-list' ,
    templateUrl     : './accounts-list.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [ require( './accounts-list.component.scss').toString() ]
} )
export class AccountsListBlock implements OnInit {
    private accounts : Array<any>;
    private imageUrls : Array;
    private imagePrefix : String;
    constructor ( private _cd : ChangeDetectorRef, private accountsListDataService : AccountsListDataService) {
    }
    public ngOnInit () : any {
        this.accounts = this.accountsListDataService.getAccounts();
        this.imageUrls = ['01.jpg', '02.jpg', '03.jpg'];
        this.imagePrefix = 'assets/images/submit/AMP_Bett3r_lockup_1_';
        return undefined;
    }
}
