import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import {
    FormControl
} from '@angular/forms';
import {
    Observable,
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
export class IdCheckBlock extends FormBlock implements OnInit, AfterViewInit {
    private greenIdModel : IGreenIdFormModel;
    private configScriptUrl = Environments.property.GreenId.configScriptUrl;
    private uiScriptUrl     = Environments.property.GreenId.uiScriptUrl;
    private styleUrl        = Environments.property.GreenId.styleUrl;
    private environment     = Environments.property.GreenId.environment;
    private checkboxLabel : string;
    @ViewChild(AmpGreenIdBlockComponent)
    private greenIdComponent : AmpGreenIdBlockComponent;
    private greenIdShown = false;
    private greenIdCompleted = false;
    private greenIdPassed = false;
    private verficationStatusSubscription : Subscription;
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit() {
        this.updateGreenIdModel();
        let scrolledSubscription = this.scrollService.$scrolled.subscribe((scrollEvent) => {
            if (scrollEvent.componentSelector
                        && scrollEvent.componentSelector.replace('-block', '') === this.__fdn.join('-')) {
                if (!this.greenIdShown) {
                    this.greenIdComponent.showGreenId();
                    this.subscribeToVerificationStatus();
                    this.greenIdShown = true;
                    scrolledSubscription.unsubscribe();
                }
            }
        });
    }

    public ngOnDestroy() {
        this.verficationStatusSubscription.unsubscribe();
    }

    public subscribeToVerificationStatus() {
        let verficationStatusControl : FormControl = this.greenIdComponent.getVerificationStatusControl();
        this.verficationStatusSubscription = verficationStatusControl.valueChanges.subscribe((verificationStatus) => {
            this.greenIdCompleted = true;
            if (verificationStatus === 'VERIFIED' || verificationStatus === 'VERIFIED_WITH_CHANGES') {
                this.greenIdPassed = true;
                this.__custom.blockTitle = this.__custom['blockTitle_verified'];
            } else {
                this.greenIdPassed = false;
                this.__custom.blockTitle = this.__custom['blockTitle_unverified'];
            }
            this._cd.markForCheck();
        });
    }

    private updateGreenIdModel() {
        const applicantIndex = this.__custom.applicantIndex;
        const applicant = this.__form.get(['Application', `Applicant${applicantIndex}Section` ]).value;
        const personalDetails = applicant.PersonalDetailsSection;
        const residentialAddress = personalDetails.Address.Address.residentialAddress.manualAddress;

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
                state : residentialAddress.state,
                streetName : residentialAddress.streetName || '',
                flatNumber : residentialAddress.unitNumber || '',
                streetNumber : residentialAddress.streetNumber || '',
                suburb : residentialAddress.suburb,
                postcode : residentialAddress.postCode,
                streetType : residentialAddress.streetType || ''
            }
        };
    }
}
