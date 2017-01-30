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
    private accountTypes = {
        offset: 'offset',
        loan: 'loan'
    };

    private mappedOffsetAccounts : Array<{ value : string, label : string }> = [];
    private mappedLoanAccounts : Array<{ value : string, label : string }> = [];

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  loginStatusService : LoginStatusService,
                  eligibleAccountsService : EligibleAccountsService ) {
        super( saveService, _cd, scrollService, loginStatusService, eligibleAccountsService );
    }

    protected get showAccountNumber () : boolean {
        return true;
    }

    protected get additionalDescription () : string {
        return this.__custom[ `additional_${this.currentAction}_instruction` ];
    }

    protected mapEligibleAccounts (accounts : any[] ) : void {
        const offsetAccounts = accounts[this.accountTypes.offset];
        const loanAccounts = accounts[this.accountTypes.loan];

        this.mappedOffsetAccounts = this.mapDropdownOptions(offsetAccounts);
        this.mappedLoanAccounts = this.mapDropdownOptions(loanAccounts);

        this.updateAccountsEligibleForTransitioning();
    }

    protected get hasAccounts () : boolean {
        if ( this.currentAction === this.accountActions.convert ) {
            return this.mappedOffsetAccounts.length > 0 || ( this.mappedOffsetAccounts.length === 0 && this.mappedLoanAccounts.length > 0);
        } else {
            return this.mappedLoanAccounts.length > 0;
        }
    }

    protected updateAccountAction ( action : string ) : void {
        this.currentAction = action;
        this.updateAccountsEligibleForTransitioning();
    }

    protected get hideNewOrConvertButtons () : boolean {
        return this.mappedOffsetAccounts.length === 0;
    }

    private updateAccountsEligibleForTransitioning () : void {
        if ( this.currentAction === this.accountActions.new || this.mappedOffsetAccounts.length === 0 ) {
            this.accountsEligibleForTransitioning = this.mappedLoanAccounts;
        } else {
            this.accountsEligibleForTransitioning = this.mappedOffsetAccounts;
        }
    }
}
