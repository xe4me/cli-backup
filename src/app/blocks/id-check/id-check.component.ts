import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {
    FormControl
} from '@angular/forms';
import {
    Subscription
} from 'rxjs';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService,
    IGreenIdFormModel,
    AmpGreenIdBlockComponent,
    Environments
} from 'amp-ddc-components';
@Component( {
    selector        : 'id-check-block' ,
    templateUrl     : './id-check.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [require('./id-check-component.scss').toString()]
} )
export class IdCheckBlock extends FormBlock implements OnInit, AfterViewInit, OnDestroy {
    private greenIdModel : IGreenIdFormModel;
    private checkboxLabel : string;
    @ViewChild(AmpGreenIdBlockComponent)
    private greenIdComponent : AmpGreenIdBlockComponent;
    private greenIdShown = false;
    private greenIdCompleted = false;
    private greenIdPassed = false;
    private verificationStatusSubscription : Subscription;
    private scrolledSubscription : Subscription;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit() {
        this.updateGreenIdModel();
    }

    public ngAfterViewInit() {
        if ( this.__isRetrieved ) {
            let verificationStatusControl : FormControl;
            verificationStatusControl = this.greenIdComponent.getVerificationStatusControl();
            this.onVerificationStatusChange(verificationStatusControl.value);
        }

        this.scrolledSubscription = this.scrollService.$scrolled.subscribe((scrollEvent) => {
            if (scrollEvent.componentSelector
                && scrollEvent.componentSelector.replace('-block', '') === this.__fdn.join('-')) {
                if (!this.greenIdCompleted && !this.greenIdShown) {
                    this.greenIdComponent.showGreenId();
                    this.subscribeToVerificationStatus();
                    this.greenIdShown = true;
                    this.scrolledSubscription.unsubscribe();
                }
            }
        });
        super.ngAfterViewInit();
    }

    public ngOnDestroy() {
        if (this.verificationStatusSubscription) {
            this.verificationStatusSubscription.unsubscribe();
        }
        if (this.scrolledSubscription) {
            this.scrolledSubscription.unsubscribe();
        }
        super.ngOnDestroy();
    }

    public subscribeToVerificationStatus() {
        let verificationStatusControl : FormControl = this.greenIdComponent.getVerificationStatusControl();
        this.verificationStatusSubscription = verificationStatusControl.valueChanges
                                                                       .subscribe(this.onVerificationStatusChange);
    }

    private onVerificationStatusChange = ( verificationStatus : string ) => {

        if (!verificationStatus || (verificationStatus === AmpGreenIdBlockComponent.verificationStatuses.IN_PROGRESS)) {
            return;
        }

        this.verificationComplete(verificationStatus);
    };

    private verificationComplete( verificationStatus : string ) {
        this.greenIdCompleted = true;

        if (this.isCompleteStatus(verificationStatus)) {
            this.greenIdPassed = true;
            this.__custom.blockTitle = this.__custom['blockTitle_verified'];
        } else {
            this.greenIdPassed = false;
            this.__custom.blockTitle = this.__custom['blockTitle_unverified'];
        }
        this.scrollService.scrollToNextUndoneBlock(this.__form);
        this._cd.markForCheck();
    }

    private isCompleteStatus( verificationStatus : string ) {
        return [
            AmpGreenIdBlockComponent.verificationStatuses.VERIFIED,
            AmpGreenIdBlockComponent.verificationStatuses.VERIFIED_WITH_CHANGES
        ].includes(verificationStatus);
    }

    private updateGreenIdModel() {
        const applicantIndex = this.__custom.applicantIndex;
        const applicant = this.__form.get(['Application', `Applicant${applicantIndex}Section` ]).value;
        const personalDetails = applicant.PersonalDetailsSection;
        const residentialAddress = personalDetails.Address.Address.residentialAddress.manualAddress;
        const state = residentialAddress.stateDropdown ? residentialAddress.stateDropdown.SelectedItem : '';
        const streetType = residentialAddress.streetTypeDropdown
                                ? residentialAddress.streetTypeDropdown.SelectedItem : '';

        this.greenIdModel = {
            firstName : personalDetails.BasicInfo.FirstName,
            lastName : personalDetails.BasicInfo.LastName,
            middleNames : personalDetails.BasicInfo.MiddleName || '',
            title : personalDetails.BasicInfo.Title,
            dateOfBirth : personalDetails.BasicInfo.DateOfBirth,
            email : personalDetails.ContactDetails.EmailAddress,
            verificationId : '',
            verificationToken : '',
            verificationStatus : '',
            address : {
                country : 'AU',
                state : state,
                streetName : residentialAddress.streetName || '',
                flatNumber : residentialAddress.unitNumber || '',
                streetNumber : residentialAddress.streetNumber || '',
                suburb : residentialAddress.suburb,
                postcode : residentialAddress.postCode,
                streetType : streetType
            }
        };
    }
}
