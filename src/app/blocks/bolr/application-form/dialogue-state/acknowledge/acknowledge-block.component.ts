import { Component , OnInit , ElementRef , ChangeDetectorRef } from '@angular/core';
import { Control , ControlGroup } from '@angular/common';
import { FormBlock , NamedControl , provideParent } from '../../../../formBlock';
import { AmpOverlayComponent } from '../../../../../components/amp-overlay/amp-overlay.component';
import {
    FormModelService ,
    ProgressObserverService ,
    ScrollService ,
    LicenseesAbstract
} from 'amp-ddc-ui-core/ui-core';
import { AfterViewInit } from '@angular/core';
import { TimerWrapper } from '@angular/core/src/facade/async';
import { AmpCheckboxComponent } from '../../../../../components/amp-checkbox/amp-checkbox.component';
import { AmpButton } from '../../../../../components/amp-button/amp-button.component';
@Component(
    {
        selector   : 'acknowledge-block' ,
        template   : `
    <div id='acknowledge-block' class='acknowledge-block mt-60 mb-80'>
        <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
        <h3 class='heading heading-intro mb-35'>Your acknowledgement</h3>
        <amp-checkbox
            [isInSummaryState]='isInSummaryState'
            [parentControl]='formControl[0].control'
            [required]='acknowledge.required'
            [scrollOutOn]='acknowledge.scrollOutOn'
            [id]='acknowledge.id'
            (select)='onAcknowledgeSelect($event)'
            >
            <div class='heading heading-contxtual-label'>
                I agree to {{ licensee }} advertising my practice's register internally, and for {{ licensee }}  to seek out
                practices that
                may be interested in becoming the servicing practice for some or all of the register.
            </div>
        </amp-checkbox>

        <div class='heading heading-micro-intro mt-35'>
            Please note, this may potentially result in some or all of the practice's register being purchased and transferred before the exercise date.
        </div>
        <amp-button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='! canGoNext' class='btn btn-ok
        mt-50'>
            OK
        </amp-button>
        <amp-button *ngIf='isInSummaryState' (click)='change()' class='btn btn-change mt-50'>
            Change
        </amp-button>
    </div>
  ` ,
        directives : [ AmpOverlayComponent , AmpCheckboxComponent , AmpButton ] ,
        styles     : [ require( './acknowledge-block.component.scss' ).toString() ] ,
        providers  : [ provideParent( AcknowledgeBlockComponent ) ]
    } )
export class AcknowledgeBlockComponent extends FormBlock implements AfterViewInit, FormBlock {
    static CLASS_NAME : string             = 'AcknowledgeBlockComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private acknowledge                    = {
        id          : 'acknowledge' ,
        disabled    : false ,
        required    : true ,
        checked     : false ,
        scrollOutOn : null
    };

    constructor ( private progressObserver : ProgressObserverService ,
                  private el : ElementRef ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ) {
        super();
        this.formControl          = [ new NamedControl( this.acknowledge.id , new Control() ) ];
        this.formControlGroupName = 'acknowledge';
    }

    ngAfterViewInit () : any {
        this.formModel.valueChanges.subscribe( ( changes ) => {
            this.scrollService.amIVisible( this.el , AcknowledgeBlockComponent.CLASS_NAME );
        } );
        this.scrollService.$scrolled.subscribe( ( changes ) => {
            if ( changes === this.formControlGroupName ) {
                this.isInSummaryState = false;
            }
        } );
        return undefined;
    }

    public isCurrentBlockActive () {
        return this.formModelService.getFlags( 'exerciseDateIsDone' );
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.acknowledge.id;
    }

    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            this.isInSummaryState = true;
            TimerWrapper.setTimeout( () => {
                this.scrollService.scrollToNextUndoneBlock( this.formModel );
            } , 100 );
            //this.scrollService.scrollMeOut( this.el , 'easeInQuad' , 70 );
            this.progressObserver.onProgress();
            this.formModelService.present( {
                action    : 'setFlag' ,
                flag      : 'acknowledgeIsDone' ,
                flagValue : true
            } );
        }
    }

    private onAcknowledgeSelect ( value ) {
        console.log( 'onAcknowledgeSelect value' , value );
    }

    private get licensee () {
        return LicenseesAbstract.getLicensee( this.formModelService.licensee );
    }

    private get canGoNext () {
        if ( this.formModel ) {
            return this.formModel.controls[ this.formControlGroupName ].valid;
        }
        return false;
    }
}
/**
 * Created by xe4me on 7/04/2016.
 */
