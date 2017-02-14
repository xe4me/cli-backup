import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewContainerRef
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
import { ApplicantGeneratorService } from '../../shared/applicant-generator.service';
@Component( {
    selector        : 'loan-offset-block',
    template        : require( '../account-transition-base/account-transition-base.html'),
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
                  viewContainerRef : ViewContainerRef,
                  loginStatusService : LoginStatusService,
                  eligibleAccountsService : EligibleAccountsService,
                  applicantGeneratorService : ApplicantGeneratorService ) {
        super( saveService, _cd, scrollService, viewContainerRef, loginStatusService, eligibleAccountsService, applicantGeneratorService );
    }

    protected get showAccountNumber () : boolean {
        return true;
    }

    protected get additionalDescription () : string {
        return this.__custom[ `additional_${ this.currentAction }_${ this.hasEligibleAccounts ? 'dropdown' : 'input' }_instruction` ];
    }

    protected mapEligibleAccounts (accounts : any[] ) : void {
        const offsetAccounts = accounts[this.accountTypes.offset];
        const loanAccounts = accounts[this.accountTypes.loan];

        this.mappedOffsetAccounts = this.mapDropdownOptions(offsetAccounts);
        this.mappedLoanAccounts = this.mapDropdownOptions(loanAccounts);

        this.updateAccountsEligibleForTransitioning();
    }

    protected get hasEligibleAccounts () : boolean {
        if ( this.currentAction === this.accountActions.convert ) {
            return this.hasOffsetAccounts || this.hasLoanAccounts;
        } else {
            return this.hasLoanAccounts;
        }
    }

    protected updateAccountAction ( action : string ) : void {
        super.updateAccountAction( action );
        this.updateAccountsEligibleForTransitioning();
    }

    protected get canTransitionAccount () : boolean {
        return this.hasOffsetAccounts;
    }

    private get hasOffsetAccounts () : boolean {
        return this.mappedOffsetAccounts.length > 0;
    }

    private get hasLoanAccounts () : boolean {
        return this.mappedLoanAccounts.length > 0;
    }

    private updateAccountsEligibleForTransitioning () : void {
        if ( this.currentAction === this.accountActions.new ) {
            this.accountsEligibleForTransitioning = this.mappedLoanAccounts;
        } else {
            this.accountsEligibleForTransitioning = this.mappedOffsetAccounts;
        }
    }
}
