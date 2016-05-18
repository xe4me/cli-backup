import { FormBlock , NamedControl } from '../../../formBlock';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import {
    Component ,
    ElementRef
} from 'angular2/core';
import { Control } from 'angular2/common';
import 'rxjs/add/operator/do';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AmpButton } from '../../../../components/amp-button/amp-button.component';
import { AMPGoogleAddressComponentGroup } from '../../../../component-groups/amp-google-address-group/amp-google-address-group.component.ts';
import { MdInputComponent } from '../../../../components/my-md-input/my-md-input.component';
import { TimerWrapper } from 'angular2/src/facade/async';
@Component( {
    selector   : 'practice-address-block' ,
    template   : `
    <div class='practice-address-block' id='practice-address-block' [class.hidden]='!isCurrentBlockActive()'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>Your practice address?</h3>

        <amp-google-address-group #ampGoogleAddressGroup
            [isInSummaryState]='isInSummaryState'
            [googleAddress]='practiceAddress.autocomplete'
            [address]='practiceAddress.address'
            [suburb]='practiceAddress.suburb'
            [state]='practiceAddress.state'
            [postcode]='practiceAddress.postcode'
            [googleAddressCtrl]='googleAddressCtrl'
            [addressCtrl]='addressCtrl'
            [suburbCtrl]='suburbCtrl'
            [stateCtrl]='stateCtrl'
            [postcodeCtrl]='postcodeCtrl'>
        </amp-google-address-group>


        <div class='errors mt-25 mb-15' *ngIf='!googleAddressCtrl.valid && googleAddressCtrl.touched &&
        !ampGoogleAddressGroup.showManualAddrEntry && ampGoogleAddressGroup.addressComponent.addrPredictions'>
            <div >
                <span class='icon icon--close icon-errors'></span>Address is a required field.
            </div>
        </div>



      <div *ngIf='
      !formModel.controls.address.valid
      && (
      ( suburbCtrl.touched && !suburbCtrl.valid ) ||
      ( addressCtrl.touched && !addressCtrl.valid ) ||
      ( stateCtrl.touched && !stateCtrl.valid ) ||
      ( postcodeCtrl.touched && !postcodeCtrl.valid )
      )'
      class='errors
      mt-25 mb-15'>
            <div class='error-item' *ngIf='!addressCtrl.valid && addressCtrl.touched &&
            ampGoogleAddressGroup.showManualAddrEntry'>
                <div *ngIf='addressCtrl.errors.required'>
                    <span class='icon icon--close icon-errors'></span>Street address is a required field.
                </div>
                <div *ngIf='addressCtrl.errors.mdPattern && addressCtrl.dirty'>
                    <span class='icon icon--close icon-errors'></span>Street address must be at least 5 characters long.
                </div>
            </div>
            <div class='error-item' *ngIf='!suburbCtrl.valid && suburbCtrl.touched &&
            ampGoogleAddressGroup.showManualAddrEntry'>
                <div *ngIf='suburbCtrl.errors.required'>
                    <span class='icon icon--close icon-errors'></span>Suburb is a required field.
                </div>
                <div *ngIf='suburbCtrl.errors.mdPattern && suburbCtrl.dirty'>
                    <span class='icon icon--close icon-errors'></span>Suburb must be at least 3 characters long.
                </div>
            </div>
            <div class='error-item' *ngIf='!stateCtrl.valid && stateCtrl.touched && ampGoogleAddressGroup.showManualAddrEntry'>
                <div *ngIf='stateCtrl.errors.required'>
                    <span class='icon icon--close icon-errors'></span>State is a required field.
                </div>
                <div *ngIf='stateCtrl.errors.mdPattern && stateCtrl.dirty'>
                    <span class='icon icon--close icon-errors'></span>Please enter a valid state.
                </div>
            </div>
            <div class='error-item' *ngIf='!postcodeCtrl.valid && postcodeCtrl.touched &&
            ampGoogleAddressGroup.showManualAddrEntry'>
                <div *ngIf='postcodeCtrl.errors.required'>
                    <span class='icon icon--close icon-errors'></span>Postcode is a required field.
                </div>
                <div *ngIf='postcodeCtrl.errors.mdPattern && postcodeCtrl.dirty'>
                    <span class='icon icon--close icon-errors'></span>Postcode must be at least 4 numeric characters long.
                </div>
            </div>
        </div>

        <amp-button *ngIf='!isInSummaryState'
        (click)='ok()' [disabled]="!canGoNext"  class='btn btn--secondary btn-ok mt-35'>
            OK
        </amp-button>
        <amp-button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change mt-35'>
            Change
        </amp-button>
        <div class='hr-block-divider'></div>
    </div>
    ` , // encapsulation: ViewEncapsulation.Emulated
    inputs     : [ 'practiceAddress' ] ,
    styles     : [ require( './practice-address.component.scss' ).toString() ] ,
    directives : [ AMPGoogleAddressComponentGroup , AmpOverlayComponent , MdInputComponent, AmpButton ]
} )
export class PracticeAddressBlockComponent extends FormBlock {
    static CLASS_NAME                      = 'PracticeAddressBlockComponent';
    private practiceAddress                =
           {
               autocomplete : {
                   id          : 'autoCompleteAddress' ,
                   label       : '' ,
                   regex       : '' ,
                   placeholder : '' ,
                   max         : 500
               } ,
               address      : {
                   id    : 'address' ,
                   label : 'Address' ,
                   regex : '^.{5,200}$' ,
                   max   : 200
               } ,
               suburb       : {
                   id    : 'suburb' ,
                   label : 'Suburb' ,
                   regex : '^.{3,100}$' ,
                   max   : 100
               } ,
               state        : {
                   id    : 'state' ,
                   label : 'State' ,
                   regex : '^(ACT|NSW|QLD|VIC|TAS|NT|WA|SA)$' ,
                   max   : 3
               } ,
               postcode     : {
                   id    : 'postcode' ,
                   label : 'Postcode' ,
                   regex : '^[0-9]{4,10}$' ,
                   max   : 10
               }
           };
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private showManualAddrEntry : boolean  = false;
    private googleAddressCtrl : Control    = new Control();
    private addressCtrl : Control          = new Control();
    private suburbCtrl : Control           = new Control();
    private stateCtrl : Control            = new Control();
    private postcodeCtrl : Control         = new Control();

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl = [
            new NamedControl( this.practiceAddress.address.id , this.addressCtrl ) ,
            new NamedControl( this.practiceAddress.suburb.id , this.suburbCtrl ) ,
            new NamedControl( this.practiceAddress.state.id , this.stateCtrl ) ,
            new NamedControl( this.practiceAddress.postcode.id , this.postcodeCtrl )
        ];
        scrollService.$scrolled.subscribe(
            message => scrollService.amIVisible( el , PracticeAddressBlockComponent.CLASS_NAME ) );
        this.formControlGroupName = 'address';
    }

    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ||
            this.googleAddressCtrl.valid ) {
            TimerWrapper.setTimeout( () => {
                this.isInSummaryState = true;
            } , 1200 );
            this.scrollService.scrollMeOut( this.el );
            this.progressObserver.onProgress();
            // SAM - Action present data to Model
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'addressIsDone' ,
                flagValue : true
            } );
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.practiceAddress.address.id;
        this.formControl[ 1 ].name = this.practiceAddress.suburb.id;
        this.formControl[ 2 ].name = this.practiceAddress.state.id;
        this.formControl[ 3 ].name = this.practiceAddress.postcode.id;
    }

    private isCurrentBlockActive () {
        if ( this.formModel && this.formModel.controls[ 'contactDetails' ] ) {
            return this.formModel.controls[ 'contactDetails' ].valid && this.formModelService.getFlags( 'contactDetailsIsDone' );
        }
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid ||
            this.googleAddressCtrl.valid;
    }
}
