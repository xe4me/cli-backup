import { FormBlock , NamedControl } from '../../../formBlock';
import { Component , ElementRef } from 'angular2/core';
import { Control } from 'angular2/common';
import { MdInputComponent } from '../../../../components/my-md-input/my-md-input.component.ts';
import { FormModelService , ProgressObserver , ScrollService } from 'amp-ddc-ui-core/ui-core';
import { AmpOverlayComponent } from '../../../../components/amp-overlay/amp-overlay.component';
import { AmpSwitchComponent } from '../../../../components/amp-switch/amp-switch.component';
import { ControlArray , ControlGroup } from 'angular2/src/common/forms/model';
import { FORM_DIRECTIVES } from 'angular2/src/common/forms/directives';
import { Validators } from 'angular2/src/common/forms/validators';
import { AmpDropdownComponent } from '../../../../components/amp-group-button/amp-group-button.component';
@Component( {
    selector   : 'equity-holder-block' ,
    template   : `
            <div class='equity-holder-block'>
                <amp-overlay [active]='!isCurrentBlockActive()'></amp-overlay>
                <h3 class='heading heading-intro'>Are there other equity holders in your practice?</h3>
                <div class='grid__item mb-60 mt-60'>
                    <amp-group-button
                        class='grid__item 4/9'
                        (select)='onSwitchChanged($event)'
                        [buttons]='hasHoldersButtons'
                        [parentControl]='formControl[0].control'
                        [groupName]='switch.hasHolders'   
                        >
                    </amp-group-button>
                </div>
                <section *ngIf='formControl[0].control.value==="YES"' >
                    <h3 class='heading heading-intro'>How many?</h3>
                    <div class='grid__item mb-60 mt-60'>
                        <amp-group-button
                            (select)='onHoldersCountGroupButtonSelect($event)'
                            [buttons]='buttons'
                            [parentControl]='formControl[1].control'
                            [groupName]='switch.holdersCount'   
                            >
                        </amp-group-button>
                    </div>
                </section>
                <section *ngIf='formControl[0].control.value==="YES" && formControl[1].control.value>=1'>
                    <h3 class='heading heading-intro'>What are their names?</h3>
                    <div class='grid__item 1/1'>
                        <div class='grid__item'  *ngFor='#item of dynamicControlGroup.controls; #i = index'>
                            <label *ngIf=' i === 0 ' class='1/5 heading heading-contxtual-label'>Their names are
                             </label>
                            <my-md-input
                                [isInSummaryState]='isInSummaryState'
                                id='firstname_{{ i }}'
                                isRequired='true'
                                valMaxLength='100'
                                class='grid__item 1/4 pl--'
                                label='First name'
                                [parentControl]='item.controls.firstName'
                                isRequired='true'>
                            </my-md-input>
                            <my-md-input
                                [isInSummaryState]='isInSummaryState'
                                id='lastname_{{ i }}'
                                isRequired='true'
                                valMaxLength='100'
                                class='grid__item 1/4 pr--'
                                label='Last name'
                                [parentControl]='item.controls.lastName'
                                isRequired='true'>
                            </my-md-input>
                            <span class='1/5 heading heading-contxtual-label' *ngIf=' 
                            dynamicControlGroup.controls.length > 1 '>
                                <span *ngIf=' i < ( dynamicControlGroup.controls.length - 2 ) '>,</span> 
                                <span *ngIf=' i === ( dynamicControlGroup.controls.length - 2 ) '>and</span>
                            </span> 
                        </div>
                    </div>
                </section>
                
                <button *ngIf='!isInSummaryState' (click)='ok()' [disabled]='!canGoNext'  
                class='btn btn--secondary 
                btn-ok btn-ok-margin-top'>
                    OK
                </button>
                    <button *ngIf='isInSummaryState' (click)='change()' class='btn btn--secondary btn-change btn-ok-margin-top'>
                    Change
                </button>
                <div class='hr-block-divider'></div>
            </div>
          ` , // encapsulation: ViewEncapsulation.Emulated
    inputs     : [ 'switch' ] ,
    styles     : [ require( './EquityHolderBlock.component.scss' ).toString() ] ,
    directives : [
        MdInputComponent ,
        AmpOverlayComponent ,
        AmpSwitchComponent ,
        FORM_DIRECTIVES ,
        AmpDropdownComponent
    ]
} )
export class EquityHolderBlockComponent extends FormBlock {
    static CLASS_NAME                      = 'EquityHolderBlockComponent';
    private isInSummaryState : boolean     = false;
    private hasClickedOnOkButton : boolean = false;
    private dynamicControlGroup : ControlArray;
    private buttons                        = [ 1 , 2 , 3 , 4 , 5 ];
    private hasHoldersButtons              = [ 'YES' , 'NO' ];
    private switch                         = {
        yes          : {
            id    : 'yesId' ,
            label : 'YES' ,
            value : 'true'
        } ,
        no           : {
            id    : 'noId' ,
            label : 'NO' ,
            value : 'false'
        } ,
        hasHolders   : 'hasHolders' ,
        holdersCount : 'holdersCount' ,
        holders      : 'holders'
    };

    public change () {
        this.hasClickedOnOkButton = false;
        this.isInSummaryState     = false;
    }

    public ok () {
        this.hasClickedOnOkButton = true;
        if ( this.formModel.controls[ this.formControlGroupName ].valid ) {
            this.isInSummaryState = true;
            this.scrollService.scrollMeOut( this.el );
            this.progressObserver.onProgress();
        }
    }

    public preBindControls ( _formBlockDef ) {
        this.formControl[ 0 ].name = this.switch.hasHolders;
        this.formControl[ 1 ].name = this.switch.holdersCount;
        this.formControl[ 2 ].name = this.switch.holders;
    }

    private onHoldersCountGroupButtonSelect ( value ) {
        const current = this.dynamicControlGroup.length;
        if ( value > current ) {
            value = value - current;
            this.addInput( value );
        } else if ( value < current ) {
            this.refreshInput( value );
        }
    }

    private onSwitchChanged ( value ) {
        if ( value === 'NO' ) {
            this.clearHoldersControlArray();
            this.formControl[ 1 ].control.updateValue( '0' );
        } else {
            this.formControl[ 1 ].control.updateValue( '' );
        }
    }

    private clearHoldersControlArray () {
        while ( this.dynamicControlGroup.length ) {
            this.dynamicControlGroup.removeAt( 0 );
        }
    }

    private addInput ( count ) {
        for ( let i = 0 ; i < count ; i ++ ) {
            const item = new ControlGroup( {
                firstName : new Control( '' , Validators.required ) ,
                lastName  : new Control( '' , Validators.required ) ,
            } );
            this.dynamicControlGroup.push( item );
        }
    }

    private refreshInput ( count ) {
        this.clearHoldersControlArray();
        this.addInput( count );
    }

    private get canGoNext () {
        return this.formModel.controls[ this.formControlGroupName ].valid;
    }

    private isCurrentBlockActive () {
        if ( this.formModel && this.formModel.controls[ 'partnership' ] ) {
            return this.formModel.controls[ 'partnership' ].valid && this.formModelService.getFlags().introIsDone;
        }
        return false;
    }

    constructor ( private progressObserver : ProgressObserver ,
                  private formModelService : FormModelService ,
                  private scrollService : ScrollService ,
                  private el : ElementRef ) {
        super();
        this.dynamicControlGroup = new ControlArray( [] );
        this.formControl         = [
            new NamedControl( this.switch.hasHolders , new Control() ) ,
            new NamedControl( this.switch.holdersCount , new Control( null , Validators.required ) ) ,
            new NamedControl( this.switch.holders , this.dynamicControlGroup )
        ];
        scrollService.$scrolled.subscribe(
            message => scrollService.amIVisible( el , EquityHolderBlockComponent.CLASS_NAME ) );
        this.formControlGroupName = 'equityHolders';
    }
}
