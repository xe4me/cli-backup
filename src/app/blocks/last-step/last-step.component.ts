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
    private isBPMS : boolean = false;

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
                this.submitInProgress = false;
                if ( result.payload.resultStatus === 'SUCCESS' ) {
                    this.isBPMS = result.payload.caseType === 'BPMS';
                    if (this.isBPMS) {
                        this.router.navigate(['confirmationTransitioning']);
                    } else {
                        this.accountsListDataService
                            .setAccountsData( referenceId.value, this.__form.value, result.payload.accounts );
                        let navigateTo = this.accountsListDataService.navigateTo();
                        this.router.navigate([navigateTo]);
                    }
                } else {
                    if ( result.payload.resultStatus === 'FAILURE') {
                        const errors = result.payload.errors;
                        if (errors && errors.length > 0) {
                            const error = errors[0].code;
                            const navigateTo : string = 'submitError';
                            if (error === SubmitErrors.customerHasBetter) {
                                this.router.navigate([navigateTo, error]);
                                return;
                            }
                        }
                    }
                    this.submitErrorMessage = this.__custom.submitErrMsg;
                    this._cd.markForCheck();
                }
            }, (error) => {
                this.submitInProgress = false;
                this.submitErrorMessage = this.__custom.submitErrMsg;
                this._cd.markForCheck();
            } );
    }
}
