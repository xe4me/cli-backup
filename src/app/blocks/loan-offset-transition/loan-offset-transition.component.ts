import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    ScrollService,
    SaveService
} from 'amp-ddc-components';
import {
    EligibleAccountsService,
    LoginStatusService
} from '../../shared';
import { AccountTransitionBaseBlock } from '../account-transition-base/account-transition-base.component';
@Component( {
    selector        : 'loan-offset-block',
    templateUrl     : '../account-transition-base/account-transition-base.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( '../account-transition-base/account-transition-base.scss' ) ]
} )
export class LoanOffsetTransitionBlock extends AccountTransitionBaseBlock {

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  loginStatusService : LoginStatusService,
                  eligibleAccountsService : EligibleAccountsService ) {
        super( saveService, _cd, scrollService, loginStatusService, eligibleAccountsService );
    }

    protected shouldShowAccountNumber ( action : string ) : boolean {
        return true;
    }

    protected additionalInstructionsText ( action : string ) : string {
        return this.__custom[ `additional_${action}_instruction` ];
    }
}
