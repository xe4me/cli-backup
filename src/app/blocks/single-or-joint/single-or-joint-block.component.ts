import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    ChangeDetectionStrategy ,
    OnInit ,
    ViewContainerRef
} from '@angular/core';
import {
    LoadedBlockInfo ,
    AmpButton ,
    ProgressObserverService ,
    FormBlock ,
    FormModelService ,
    ScrollService,
    CustomerDetailsService
} from 'amp-ddc-components';
import {
    Validators ,
    FormGroup,
    FormControl
} from '@angular/forms';
import {
    Constants ,
    ApplicantGeneratorService ,
    SharedFormDataService ,
    PrepopMappingService
} from '../../shared';
import { MyAMPLoginBlockComponent } from '../my-amplogin-block/my-amplogin-block.component';
import { FDN } from '../../forms/better-form/Application.fdn';
@Component( {
    selector        : 'single-or-joint-block' ,
    templateUrl     : './single-or-joint-block.component.html' ,
    styles          : [ require( './single-or-joint-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SingleOrJointBlockComponent extends FormBlock implements OnInit {
    private static secondApplicantSectionIndex : number = 2;
    public applicant2Added : boolean = false;
    private jointApplicantKey : string;
    private singleApplicantKey : string;

    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ,
                  private customerDetailsService : CustomerDetailsService,
                  private applicantGenerator : ApplicantGeneratorService ,
                  private viewContainerRef : ViewContainerRef ,
                  private sharedDataService : SharedFormDataService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        this.singleApplicantKey = Constants.singleApplicant;
        this.jointApplicantKey  = Constants.jointApplicant;

        if ( !this.__controlGroup.contains( this.__custom.controls[ 0 ].id ) ) {
            this.__controlGroup.addControl(this.__custom.controls[0].id, new FormControl(null, Validators.required));
        }

        this.formModelService.setSaveRelativeUrl( Constants.saveUrl );
        this.formModelService.saveResponse.subscribe( ( result ) => {
            if ( result.payload.meta && result.payload.meta.id ) {
                this.storeReferenceIdInModel( result.payload.meta.id );
            }
        } );
        // load applicant 1
        this.__loadNext( this.applicantGenerator.getApplicantSection( 1 ), this.viewContainerRef);
        // Subscribe to notify when all the blocks that are inside of ApplicantSection are successfully loaded ,
        // then go next
        // The reason is if you don't do this , when you start with a Single applicant and finish the form and go
        // and change to Joint applicant and click on Joint , it will take you to the submit page , where as it
        // should've taken you to the first block in Applicant2 !!!
        // It was happening because we don't know how long it might take to load Applicant2 but we where doing
        // onNext nevertheless , which is wrong, because if it takes 2 mintue to load , we should wait and then go
        // to next undone block , which is inside the applicant2Section
        this.__onChildsLoaded( ( _loadedComponent : LoadedBlockInfo ) => {
            if ( _loadedComponent.name === 'Applicant2Section' ) {
                this.applicant2Added = true;
                this.onNext();
            }
        } );
    }

    public addOrRemoveJointApplicantSection ( singleJointIndicator : string ) {
        if ( ! this.applicant2Added && singleJointIndicator === Constants.jointApplicant ) {
            let applicant2Sections = this.applicantGenerator.getApplicantSection( 2 );
            this.__loadAt( applicant2Sections , SingleOrJointBlockComponent.secondApplicantSectionIndex);
            return;
        }
        if ( this.applicant2Added && singleJointIndicator === Constants.singleApplicant ) {
            this.__removeAt(SingleOrJointBlockComponent.secondApplicantSectionIndex).then( () => {
                this.applicant2Added = false;
                this.onNext();
            } );
            return;
        }
        this.onNext();
    }

    private onSingleJoint ( singleJointIndicator : string ) {
        // Trigger the customer detail prepopulation logic
        this.prepopCustomerDetails();
        const singleOrJoint = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        singleOrJoint.setValue( singleJointIndicator );
        singleOrJoint.markAsTouched();
        this.addOrRemoveJointApplicantSection( singleJointIndicator );
    }

    private storeReferenceIdInModel ( referenceId ) {
        let referenceIdControl = this.sharedDataService.getReferenceIdControl( this.__form );
        if ( ! referenceIdControl.value ) {
            referenceIdControl.setValue( referenceId );
            this.formModelService.setSaveRelativeUrl( Constants.saveUrl + '?id=' + referenceId );
        }
    }
    // TODO move this to a service - this component is getting bloated
    // https://gitlab.ccoe.ampaws.com.au/DDC/experience-bett3r/issues/1
    private prepopCustomerDetails () {
        let isLoggedIn = false; // Default assumption is that we are not logged in.
                                // TODO: This will have to change if we start the journey from
                                //       MyAMP and never went thru myAMPLoginBlock
        // Lets check the myAMPLoginBlock loginResult
        let ampLoginBlock = (<FormGroup> this.__form.get(FDN.MyAMPLoginBlock));
        if ( ampLoginBlock && ampLoginBlock.contains(MyAMPLoginBlockComponent.LOGIN_STATUS_CONTROL_NAME )) {
            let loginResultControl = <FormControl> this.__form.get(
                FDN.MyAMPLoginBlock.concat(MyAMPLoginBlockComponent.LOGIN_STATUS_CONTROL_NAME));
            isLoggedIn = Constants.loginSuccess === loginResultControl.value;
        }
        if (isLoggedIn) {
            // Trigger the prepopulation from CMDM
            this.customerDetailsService
                    .getCustomerDetails()
                        .then((data) => {
                            let FDN_Applicant1_PersonalDetailsSection = [
                                'Application' , 'Applicant1Section' , 'PersonalDetailsSection' ];

                            let basicInfo = this.__form.get(
                                FDN_Applicant1_PersonalDetailsSection.concat('BasicInfo'));

                            let contactDetails = this.__form.get(
                                FDN_Applicant1_PersonalDetailsSection.concat('ContactDetails'));

                            // Lets do some prepopulation
                            PrepopMappingService.prepopBasicInfo(basicInfo, data.payload);
                            // TODO: For December release, do not prepopulate addresses as we cannot easily
                            // map them to the required fields
                            // this.prepopAddresses(data.payload);
                            PrepopMappingService.prepopContactDetails(contactDetails, data.payload);

                            // TODO: Make sure we load the special prepop block and not the manual entry blocks
                        }).catch((err) => {
                            console.error('Failed to customer details', err);
                            // According to the mapping rules if the single CMDM call fails there is no need to retry
                            // https://teamtools.amp.com.au/confluence/pages/viewpage.action?pageId=55352824

                            // TODO: Make sure we load the manual entry path
                        });
        }
    }

}
