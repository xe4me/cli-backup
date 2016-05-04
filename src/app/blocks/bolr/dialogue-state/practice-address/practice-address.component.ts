import { FormBlock , NamedControl } from '../../../formBlock';
import { FormModelService , ProgressObserverService , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { Component , ElementRef , ViewEncapsulation , OnInit , AfterViewInit , NgZone, ViewChild } from 'angular2/core';
import { Control } from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AMPGoogleAddressComponentGroup } from '../../../../component-groups/amp-google-address-group/amp-google-address-group.component.ts';
import { MdInputComponent } from '../../../../components/my-md-input/my-md-input.component';


@Component( {
    selector : 'practice-address-block' ,
    template : `
    <div class='practice-address-block' [class.hidden]='!isCurrentBlockActive()'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro'>Your practice address?</h3>

        <amp-google-address-group
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

        <div *ngIf='hasClickedOnOkButton && !formModel.controls.address.valid' class='errors mt'>
            <div *ngIf='!formControl[0].control.valid'>
                <div>
                    <span class='icon icon--close icon-errors'></span>Please answer this question
                </div>
            </div>
        </div>

        <button *ngIf='!isInSummaryState' (click)='ok()' [disabled]="!canGoNext"  class='btn btn--secondary
        btn-ok btn-ok-margin-top'>
            OK
        </button>
        <button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change btn-ok-margin-top'>
            Change
        </button>
        <div class='hr-block-divider'></div>


    </div>
    ` , // encapsulation: ViewEncapsulation.Emulated
    inputs : [ 'practiceAddress' ] ,
    styles : [ require( './practice-address.component.scss' ).toString() ] ,
    directives : [ AMPGoogleAddressComponentGroup , AmpOverlayComponent, MdInputComponent ]
} )
export class PracticeAddressBlockComponent extends FormBlock {
    static CLASS_NAME                      = 'PracticeAddressBlockComponent';

    private practiceAddress                =
        {
            autocomplete : {
                id : 'autoCompleteAddress' ,
                label : '' ,
                regex : '' ,
                placeholder: '',
                max : 500
            },
            address : {
                id : 'address',
                label: 'Address',
                regex: '',
                max : 200
            },
            suburb : {
                id : 'suburb',
                label: 'Suburb',
                regex: '',
                max : 100
            },
            state : {
                id : 'state',
                label: 'State',
                regex: '^(ACT|NSW|QLD|VIC|TAS|NT|WA)$',
                max : 3
            },
            postcode : {
                id : 'postcode',
                label: 'Postcode',
                regex: '^[0-9]{4}$',
                max : 4
            }
        };
    private isInSummaryState : boolean         = false;
    private hasClickedOnOkButton : boolean     = false;
    private showManualAddrEntry: boolean       = false;
    private googleAddressCtrl: Control         = new Control();
    private addressCtrl: Control               = new Control();
    private suburbCtrl: Control                = new Control();
    private stateCtrl: Control                 = new Control();
    private postcodeCtrl: Control              = new Control();


    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        this.isInSummaryState = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            this.isInSummaryState = true;
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
            return this.formModel.controls[ 'contactDetails' ].valid && this.formModelService.getFlags().contactDetailsIsDone;
        }
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid;
    }

    constructor ( private progressObserver : ProgressObserverService ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.formControl = [
            new NamedControl( this.practiceAddress.address.id , this.addressCtrl ),
            new NamedControl( this.practiceAddress.suburb.id , this.suburbCtrl ),
            new NamedControl( this.practiceAddress.state.id , this.stateCtrl ),
            new NamedControl( this.practiceAddress.postcode.id , this.postcodeCtrl )
        ];
        scrollService.$scrolled.subscribe(
            message => scrollService.amIVisible( el , PracticeAddressBlockComponent.CLASS_NAME ) );
        this.formControlGroupName = 'address';
    }
}
