import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService,
    IGreenIdFormModel,
    Environments,
    AmpGreenIdBlockComponent
} from 'amp-ddc-components';
@Component( {
    selector        : 'id-check-block' ,
    templateUrl     : './id-check.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class IdCheckBlock extends FormBlock implements OnInit {
    private greenIdModel : IGreenIdFormModel;
    private configScriptUrl = Environments.property.GreenId.configScriptUrl;
    private uiScriptUrl = Environments.property.GreenId.uiScriptUrl;
    private styleUrl = Environments.property.GreenId.styleUrl;
    private environment = Environments.property.GreenId.environment;
    private checkboxLabel : string;
    @ViewChild(AmpGreenIdBlockComponent) private greenIdComponent : AmpGreenIdBlockComponent;
    private greenIdShown = false;
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit() {
        this.updateGreenIdModel();
        let scrolledSubscription = this.scrollService.$scrolled.subscribe((_obj) => {
            if (_obj.componentSelector && _obj.componentSelector.replace('-block', '') === this.__fdn.join('-')) {
                if (!this.greenIdShown) {
                    this.greenIdComponent.showGreenId();
                    this.greenIdShown = true;
                    scrolledSubscription.unsubscribe();
                }
            }
        });
    }

    public updateGreenIdModel() {
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
