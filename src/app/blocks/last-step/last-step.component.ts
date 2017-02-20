import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ChangeDetectionStrategy,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    Subscription
} from 'rxjs';
import {
    FormBlock ,
    ScrollService ,
    SaveService ,
    SaveAndSubmitService

} from 'amp-ddc-components';
import {
    Constants,
    SharedFormDataService,
    AccountsListDataService,
    SubmitErrors
} from '../../shared';
@Component( {
    selector        : 'last-step-block' ,
    template        : require( './last-step.component.html') ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [require('./last-step.component.scss').toString()]
} )
export class LastStepBlock extends FormBlock implements AfterViewInit, OnDestroy {
    private submitErrorMessage;
    private isJointApplication : boolean = false;
    private submitInProgress : boolean = false;
    private singleOrJointSubscription : Subscription;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private saveAndSubmitService : SaveAndSubmitService,
                  private router : Router,
                  private sharedFormDataService : SharedFormDataService,
                  private accountsListDataService : AccountsListDataService) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit() {
        const singleOfJointControl = this.sharedFormDataService.getSingleOrJointControl(this.__form);

        this.setSingleOrJoint(singleOfJointControl.value);

        this.singleOrJointSubscription = singleOfJointControl.valueChanges.subscribe((val) => {
            this.setSingleOrJoint(val);
            this._cd.markForCheck();
        });

        super.ngAfterViewInit();
    }

    public ngOnDestroy() {
        this.singleOrJointSubscription.unsubscribe();
        super.ngOnDestroy();
    }

    private get isFinalStepInApplication() : boolean {
        return !this.isJointApplication || this.isSecondApplicant;
    }

    private get isSecondApplicant() : boolean {
        return this.__custom.applicantIndex === 2;
    }

    private setSingleOrJoint(singleOrJoint : string) {
        this.isJointApplication = singleOrJoint === Constants.jointApplicant;
    }

    private submitForm() {
        if (this.__form.invalid) {
            // Scroll to the first invalid block
            this.onNext();
            return;
        }

        this.submitInProgress = true;
        const referenceId = this.sharedFormDataService.getReferenceIdControl(this.__form);
        this.saveAndSubmitService.saveAndSubmit(this.__form.value, referenceId.value)
            .subscribe((result) => {
                const payload = result.payload;
                this.submitInProgress = false;
                if ( payload.resultStatus === 'SUCCESS' ) {
                    const isBPMS = payload.caseType === 'BPMS';
                    if (isBPMS) {
                        this.router.navigate(['confirmationTransitioning']);
                    } else {
                        this.accountsListDataService
                            .setAccountsData( referenceId.value, payload.application, payload.accounts );
                        let navigateTo = this.accountsListDataService.navigateTo();
                        this.router.navigate([navigateTo]);
                    }
                } else {
                    if ( payload.resultStatus === 'FAILURE' ) {
                        const errors = payload.errors;
                        if (errors && errors.length > 0) {
                            const error = errors[0].code;
                            const navigateTo : string = 'submitError';
                            if ( error === SubmitErrors.customerHasBetter ) {
                                this.router.navigate( [navigateTo, error] );
                                return;
                            }
                        }
                    }
                    this.submitErrorMessage = this.__custom.submitErrMsg;
                    this._cd.markForCheck();
                }
            }, () => {
                this.submitInProgress = false;
                this.submitErrorMessage = this.__custom.submitErrMsg;
                this._cd.markForCheck();
            } );
    }
}
