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
    FormModelService ,
    ProgressObserverService
} from 'amp-ddc-components';
import {
    Constants,
    SharedFormDataService,
    AccountsListDataService
} from '../../shared';
@Component( {
    selector        : 'last-step-block' ,
    templateUrl     : './last-step.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class LastStepBlock extends FormBlock implements AfterViewInit, OnDestroy {
    private submitErrorMessage;
    private successMessage;
    private isJointApplication : boolean = false;
    private singleOrJointSubscription : Subscription;

    constructor ( formModelService : FormModelService,
                  elementRef : ElementRef,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  progressObserver : ProgressObserverService,
                  private router : Router,
                  private sharedFormDataService : SharedFormDataService,
                  private accountsListDataService : AccountsListDataService
               ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
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

        const referenceId = this.sharedFormDataService.getReferenceIdControl(this.__form);
        this.formModelService.saveAndSubmitApplication(this.__form.value, Constants.submitUrl, referenceId.value)
            .subscribe((result) => {
                if ( result.payload.resultStatus === 'SUCCESS' ) {
                    this.accountsListDataService.setAccounts( result.payload.accounts );
                    let navigateTo = this.accountsListDataService.isNormal() ?
                        'confirmation' :
                        'confirmationWithCondition';
                    this.router.navigate([navigateTo]);
                } else {
                    // TODO remove this once error handling is done
                    this.successMessage = result.payload;
                    this.submitErrorMessage = null;
                    this._cd.markForCheck();
                }
            }, (error) => {
                this.submitErrorMessage = JSON.stringify(error);
                this._cd.markForCheck();
            } );
    }
}
