import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    ChangeDetectionStrategy ,
    OnInit ,
    AfterViewInit ,
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
import { FDN } from '../../forms/better-form/Application.fdn';
import { MyAMPLoginBlockComponent } from '../my-amplogin-block/my-amplogin-block.component';
@Component( {
    selector        : 'new-or-existing-customer-block' ,
    templateUrl     : './new-or-existing-customer-block.component.html' ,
    styles          : [ require( './new-or-existing-customer-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class NewOrExistingCustomerBlock extends FormBlock implements OnInit, AfterViewInit {
    private loadedLoginBlock = false;
    private hideThisBlock = false;
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ,
                  private customerDetailsService : CustomerDetailsService,
                  private applicantGenerator : ApplicantGeneratorService ,
                  private viewContainerRef : ViewContainerRef ,
                  private sharedDataService : SharedFormDataService,
                  private viewReference : ViewContainerRef ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
        this.disableAutoSave();
    }

    public ngOnInit () {
        if ( !this.__controlGroup.contains( this.__custom.controls[ 0 ].id ) ) {
            this.__controlGroup.addControl(this.__custom.controls[0].id, new FormControl(null, Validators.required));
        }
        this.__controlGroup.markAsTouched();
    }

    public ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.__isRetrieved) {
            this.hideThisBlock =true;
            setTimeout(()=>{
                this.newOrLogin(this.__controlGroup.get( this.__custom.controls[ 0 ].id ).value);
            },10);
        }
    }

    private addOrRemoveContinueSection(newOrLoginToMyAmp : string) : Promise<any> {
        const loginBlockControlGroup = this.__form.get(Constants.MyAMPLoginBlockFDN);
        if ( newOrLoginToMyAmp === Constants.existingCustomer && !loginBlockControlGroup) {
            this.loadedLoginBlock = true;
            return this.__loadNext( this.__custom.optionalBlocks.MyAMPLoginBlock , this.viewReference );
        }
        if ( newOrLoginToMyAmp === Constants.newCustomer && loginBlockControlGroup) {
            this.loadedLoginBlock = false;
            return this.__removeNext( this.viewReference );
        }

        // New application, so do prepop
        this.prepopCustomerDetails();
        return new Promise((resolve) => resolve() );;
    }

    private newOrLogin ( newOrLoginToMyAmp : string ) {
        const newOrLoginToMyAmpControl = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        newOrLoginToMyAmpControl.setValue( newOrLoginToMyAmp );
        newOrLoginToMyAmpControl.markAsTouched();
        this.addOrRemoveContinueSection( newOrLoginToMyAmp ).then((actualComponent) => {
            this.hideThisBlock = true;
            setTimeout(() => {
                this.onNext();
            }, 0);
        });
    }

    private newApplication(){
        this.newOrLogin(Constants.newCustomer);
    }

    private loginToMyAmp(){
        this.newOrLogin(Constants.existingCustomer);
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

                            let basicInfo = <FormGroup> this.__form.get(
                                FDN_Applicant1_PersonalDetailsSection.concat('BasicInfo'));

                            let contactDetails = <FormGroup> this.__form.get(
                                FDN_Applicant1_PersonalDetailsSection.concat('ContactDetails'));

                            // Lets do some prepopulation
                            PrepopMappingService.prepopBasicInfo(basicInfo, data.payload, this.customerDetailsService);
                            // TODO: For December release, do not prepopulate addresses as we cannot easily
                            // map them to the required fields
                            // this.prepopAddresses(data.payload);
                            PrepopMappingService.prepopContactDetails(
                                contactDetails,
                                data.payload,
                                this.customerDetailsService);

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
