import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy, ViewContainerRef
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
import {ApplicantGeneratorService} from "../../shared/applicant-generator.service";
@Component( {
    selector        : 'deposit-transition-block',
    template        : require( '../account-transition-base/account-transition-base.html'),
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( '../account-transition-base/account-transition-base.scss' ) ]
} )
export class DepositTransitionBlock extends AccountTransitionBaseBlock {

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  viewContainerRef : ViewContainerRef,
                  loginStatusService : LoginStatusService,
                  eligibleAccountsService : EligibleAccountsService,
                  applicantGeneratorService : ApplicantGeneratorService) {
        super( saveService, _cd, scrollService, viewContainerRef, loginStatusService, eligibleAccountsService, applicantGeneratorService);
    }
}
