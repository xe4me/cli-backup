import { FormBlock } from '../../formBlock';
import { Component , ElementRef , AfterViewInit } from 'angular2/core';
import {
    FormModelService ,
    ProgressObserverService ,
    ScrollService ,
    LicenseesAbstract ,
    AssociationLengthAbstract ,
    ExerciseDateAbstract
} from 'amp-ddc-ui-core/ui-core';
import { AmpOverlayComponent } from '../../../components/amp-overlay/amp-overlay.component';
import { AmpStickyOnScrollDirective } from '../../../directives/amp-sticky-on-scroll.directive';
import { ContactDetailsBlockComponent } from '../../../blocks/bolr/dialogue-state/contact-details/contact-details-block.component';
import { SaleReasonBlockComponent } from '../../../blocks/bolr/dialogue-state/sale-reason/sale-reason-block.component';
import { PartnershipManagerBlockComponent } from '../../../blocks/bolr/dialogue-state/partnership-manager/partnership-manager.component';
import { AcknowledgeBlockComponent } from '../../../blocks/bolr/dialogue-state/acknowledge/acknowledge-block.component';
import { EquityHolderBlockComponent } from '../../../blocks/bolr/dialogue-state/equity-holder/equity-holder-block.component';
import { FullOrPartialBlockComponent } from '../../../blocks/bolr/dialogue-state/full-or-partial/full-or-partial-block.component';
import { ExerciseDateBlockComponent } from '../../../blocks/bolr/dialogue-state/exercise-date/exercise-date-block.component';
import { PracticeAddressBlockComponent } from '../../../blocks/bolr/dialogue-state/practice-address/practice-address.component';
import { PracticeAssociationBlockComponent } from '../../../blocks/bolr/dialogue-state/practice-association/practice-association-block.component';
import { Router } from 'angular2/router';
import { AmpButton } from '../../../components/amp-button/amp-button.component';
@Component( {
    selector   : 'review-block' ,
    template   : `
            <div *ngIf='formIsFullyValid' id='review-block' class='review grid__item mb-80'>
                <h3 class='heading heading-intro mt-60 mb-30'>Summary of your request details</h3>
                <div class='review--sections'>
                    <section class='review--sections__left grid__item 2/4'>
                        <div class='review--item grid__item 1/1 mb-25'>
                            <div class='heading heading-contxtual-label'>
                                <span>{{practiceName}}</span>
                            </div> 
                            <div class='heading heading-contxtual-label'> 
                                <div class='grid__item 1/2'>Practice ID: {{payeeID}}
                                </div><!--
                                --><div class='grid__item 1/2'>Practice principal: {{practicePrincipal}}</div>
                            </div>    
                        </div>
                        <div class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Contact details</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10'>
                                <span>{{ email }}</span>
                                <span>{{ phone }}</span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changeContactDetailsBlock()'>
                                    change
                                </amp-button>         
                            </div>    
                        </div>
                        
                        <div class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Partnership manager</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10'>
                                <span>{{ partnershipFirstName }}</span>
                                <span>{{ partnershipLastName }}</span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changePartnershipBlock()'>
                                    change
                                </amp-button>
                            </div>    
                        </div>
                        
                        <div class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Practice address</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10'>
                                <span>{{ practiceAddress }}</span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changePracticeAddressBlock()'>
                                    change
                                </amp-button>                 
                            </div>    
                        </div>
                        <div class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Other equity holders in the practice</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10' *ngIf='!hasEquityHolders' >
                                    <span>None</span>
                            </div><!--
                            --><div class='review--item__value grid__item 6/10' *ngIf='hasEquityHolders' >
                                <span *ngFor='#item of equityHoldersList'>
                                    {{item.firstName}} {{item.lastName}}
                                </span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changeEquityHolderBlock()'>
                                    change
                                </amp-button>                 
                            </div>    
                        </div>
                        <div class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Full or Partial {{ licenseeBuybackFacility }}</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10'>
                                <div *ngIf='isFullSale'>
                                    <span>Full sale - </span>
                                    <span *ngFor='#item of advisers ; #i = index'>
                                        <span *ngIf='advisers.length > 1 '>
                                            <span *ngIf=' i < ( advisers.length - 1 ) && i >0 '> , </span> 
                                            <span *ngIf=' i === ( advisers.length - 1 ) '> and </span>
                                        </span>
                                        {{ item.adviserName }} ({{ item.adviserId }})
                                    </span>
                                    will be impacted by this decision.
                                </div>
                                <span *ngIf='isFullSale'>{{ impactedAdvisersDetails }}</span>
                                <span *ngIf='isPartialSale'>Partial sale</span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changeFullOrPartialBlock()'>
                                    change
                                </amp-button>                 
                            </div>    
                        </div>
                        <div *ngIf='isFullSale' class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Practice tenure and amount of notice being provided</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10'>
                                <span>{{ exerciseLengthText }}</span>
                                <span *ngIf='hasExceptionalCircumstances'>{{ exceptionalCircumstances }}</span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changePracticeAssociationBlock()'>
                                    change
                                </amp-button>                 
                            </div>    
                        </div>
                        <div *ngIf='isPartialSale' class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Reasons for sale</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10'>
                                <span>{{ saleReason }}</span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changeSaleReasonBlock()'>
                                    change
                                </amp-button>                 
                            </div>    
                        </div>
                        <div class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Requested exercise date</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10'>
                                <span>{{ exerciseDate }}</span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changeExerciseDateBlock()'>
                                    change
                                </amp-button>                 
                            </div>    
                        </div>
                        <div class='review--item grid__item 1/1'>
                            <div class='review--item__title grid__item 3/10'>
                                <span>Acknowledgement</span>
                            </div><!--    
                        --><div class='review--item__value grid__item 6/10'>
                                <span>I agree to {{ licensee }} advertising my practice's register internally, and 
                                for {{ licensee }}  to seek out 
practices that may be interested in becoming the servicing practice for some or all of the register.</span>
                            </div><!--
                         --><div class='review--item__button grid__item 1/10'>
                                <amp-button class='btn btn-anchor' (click)='changeAcknowledgeBlock()'>
                                    change
                                </amp-button>                 
                            </div>    
                        </div>
                    </section><!--
                 --><section class='review--sections__right grid__item 1/4' [sticky-on-scroll]='shouldStick' >
                        <div class='mb-30 mt-25'>
                            <amp-button (click)='submit($event)' [disabled]='isImpersonated' class='btn btn-submit 
                            btn-review'>
                                Submit <span class='icon icon--chevron-right'></span>
                            </amp-button>    
                        </div>
                        <div>
                            <amp-button (click)='download($event)'class='btn btn-change btn-review'>
                                Download a copy
                            </amp-button>
                        </div>
                    </section>
                </div>
            </div>
          ` ,
    styles     : [ require( './review-block.component.scss' ).toString() ] ,
    directives : [
        AmpOverlayComponent ,
        AmpStickyOnScrollDirective ,
        AmpButton
    ]
} )
export class ReviewBlockComponent extends FormBlock implements AfterViewInit {
    static CLASS_NAME        = 'ReviewBlockComponent';
    private formIsFullyValid = false;

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private router : Router ,
                  private el : ElementRef ) {
        super();
        this.formControl          = [];
        this.formControlGroupName = 'review';
    }

    preBindControls ( _formBlockDef ) {
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , ReviewBlockComponent.CLASS_NAME );
            this.formIsFullyValid = this.formModel.valid && this.formModelService.getFlags( 'acknowledgeIsDone' );
        } );
        this.formModelService.$flags.subscribe( ( changes ) => {
            if ( changes.hasOwnProperty( 'acknowledgeIsDone' ) ) {
                this.formIsFullyValid = this.formModel.valid && changes[ 'acknowledgeIsDone' ];
            }
        } );
        return undefined;
    }

    // This is the stick rule , it should stick if this condition is met
    public shouldStick = () : boolean => {
        return this.scrollService.getMyWindowOffset( this.el ) <= 80;
    };

    private getBlockValue ( blockGroupName : string ) {
        return this.formModel.value[ blockGroupName ] || {};
    }

    private scrollTo ( componentName : string ) {
        this.scrollService.scrollToComponentByClassName( componentName );
    }

    private submit ( event ) {
        this.goToConfirmationPage( event );
    }

    private download () {
        alert('Downloading the form ....');
    }

    private changeContactDetailsBlock () {
        this.scrollTo( ContactDetailsBlockComponent.CLASS_NAME );
    }

    private changeSaleReasonBlock () {
        this.scrollTo( SaleReasonBlockComponent.CLASS_NAME );
    }

    private changePartnershipBlock () {
        this.scrollTo( PartnershipManagerBlockComponent.CLASS_NAME );
    }

    private changeAcknowledgeBlock () {
        this.scrollTo( AcknowledgeBlockComponent.CLASS_NAME );
    }

    private changeEquityHolderBlock () {
        this.scrollTo( EquityHolderBlockComponent.CLASS_NAME );
    }

    private changeExerciseDateBlock () {
        this.scrollTo( ExerciseDateBlockComponent.CLASS_NAME );
    }

    private changeFullOrPartialBlock () {
        this.scrollTo( FullOrPartialBlockComponent.CLASS_NAME );
    }

    private changePracticeAddressBlock () {
        this.scrollTo( PracticeAddressBlockComponent.CLASS_NAME );
    }

    private changePracticeAssociationBlock () {
        this.scrollTo( PracticeAssociationBlockComponent.CLASS_NAME );
    }

    private get associationLengthValue () {
        return this.practiceAssociationBlock[ AssociationLengthAbstract.groupName ];
    }

    private get impactedAdvisersDetails () {
        return this.fullOrPartialBlock.impactedAdvisersDetails;
    }

    private get exerciseDateValue () {
        return this.practiceAssociationBlock[ ExerciseDateAbstract.groupName ];
    }

    private get formModelServiceModel () {
        return this.formModelService.getModel();
    }

    private get practiceName () {
        return this.formModelServiceModel.context.practiceName;
    }

    private get payeeID () {
        return this.formModelServiceModel.context.payeeID;
    }

    private get saleReason () {
        return this.saleReasonBlock.saleReason;
    }

    private get exerciseDate () {
        return this.exerciseDateBlock.requestDateId;
    }

    private get equityHoldersList () {
        return this.equityHoldersBlock.holders || [];
    }

    private get practicePrincipalFirstName () {
        return this.formModelServiceModel.context.practicePrincipalFirstName;
    }

    private get contactDetailsBlock () {
        return this.getBlockValue( 'contactDetails' );
    }

    private get exerciseDateBlock () {
        return this.getBlockValue( 'exerciseDate' );
    }

    private get equityHoldersBlock () {
        return this.getBlockValue( 'equityHolder' );
    }

    private get partnershipBlock () {
        return this.getBlockValue( 'partnershipManager' );
    }

    private get practiceAssociationBlock () {
        return this.getBlockValue( 'practiceAssociation' );
    }

    private get fullOrPartialBlock () {
        return this.getBlockValue( 'fullOrPartial' );
    }

    private get saleReasonBlock () {
        return this.getBlockValue( 'saleReason' );
    }

    private get addressBlock () {
        return this.getBlockValue( 'practiceAddress' );
    }

    private get partnershipFirstName () {
        return this.partnershipBlock.firstName;
    }

    private get partnershipLastName () {
        return this.partnershipBlock.lastName;
    }

    private get email () {
        return this.contactDetailsBlock.emailId;
    }

    private get phone () {
        return this.contactDetailsBlock.phoneId;
    }

    private get advisers () {
        return this.formModelService.advisers;
    }

    private get practicePrincipalLastName () {
        return this.formModelServiceModel.context.practicePrincipalLastName;
    }

    private get practicePrincipal () {
        return this.practicePrincipalFirstName + ' ' + this.practicePrincipalLastName;
    }

    private get exerciseDateOptions () {
        return ExerciseDateAbstract.getOptionsByLicensee( this.formModelService.context.licensee , this.associationLengthValue );
    }

    private get exerciseLengthText () {
        return ExerciseDateAbstract.getText( this.exerciseDateValue , this.exerciseDateOptions );
    }

    private get hasExceptionalCircumstances () {
        return this.practiceAssociationBlock[ ExerciseDateAbstract.textFieldName ] && this.practiceAssociationBlock[ ExerciseDateAbstract.textFieldName ] !== null && this.practiceAssociationBlock[ ExerciseDateAbstract.textFieldName ] !== '';
    }

    private get exceptionalCircumstances () {
        return this.practiceAssociationBlock[ ExerciseDateAbstract.textFieldName ];
    }

    private get hasEquityHolders () {
        return this.equityHoldersBlock.hasHolders === 'Yes' && this.equityHoldersList.length > 0;
    }

    private get licensee () {
        return LicenseesAbstract.getLicensee( this.formModelService.licensee );
    }

    private get licenseeBuybackFacility () {
        return LicenseesAbstract.getLicenseeBuybackFacility( this.formModelService.licensee );
    }

    private get isFullSale () {
        return this.fullOrPartialBlock.fullOrPartial === 'Full';
    }

    private get isPartialSale () {
        return this.fullOrPartialBlock.fullOrPartial === 'Partial';
    }

    private get isImpersonated () {
        return this.formModelService.context.impersonatedUser !== null;
    }

    private get practiceAddress () {
        return this.formModelService.getFlags( 'addressIsDone' ) === true ? this.addressBlock.address + ', ' + this.addressBlock.suburb + ', ' + this.addressBlock.state + ', ' + this.addressBlock.postcode + '.' : '';
    }

    private goToConfirmationPage ( event ) {
        this.router.navigate( [ '/BuyBackFormComponent' , { id : 'receipt' } ] );
    }
}

