import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    ScrollService,
    SaveService,
    LoginStatusService
} from 'amp-ddc-components';
import {
    EligibleAccountsService
} from '../../shared';
import { AccountTransitionBaseBlock } from '../account-transition-base/account-transition-base.component';
@Component( {
    selector        : 'deposit-transition-block',
    templateUrl     : '../account-transition-base/account-transition-base.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( '../account-transition-base/account-transition-base.scss' ) ]
} )
export class DepositTransitionBlock extends AccountTransitionBaseBlock {

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  loginStatusService : LoginStatusService,
                  eligibleAccountsService : EligibleAccountsService ) {
        super( saveService, _cd, scrollService, loginStatusService, eligibleAccountsService );
    }
}
