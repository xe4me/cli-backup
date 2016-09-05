import { Control , ControlArray , ControlGroup } from '@angular/common';
import { forwardRef , provide , Provider , ElementRef } from '@angular/core';
import {
    Action ,
    UIControlService ,
    FormModelService ,
    ProgressObserverService ,
    ScrollService
} from 'amp-ddc-ui-core/ui-core';
import { TimerWrapper } from '@angular/core/src/facade/async';
import { arrayJoinByDash } from "./util/functions.utils";
export class NamedControl {
    constructor ( public name : string , public control : any ) {
    }
}
export const provideParent =
                 ( component : any , parentType? : any ) =>
                     provide( parentType || FormBlock , { useExisting : forwardRef( () => component ) } );
export abstract class FormBlock {
    protected isInSummaryState : boolean     = false;
    protected isActive : boolean             = false;
    protected hasClickedOnOkButton : boolean = false;
    protected selectorName : string          = 'default-form-block-selector-name';
    protected visibleFlag : string           = 'defaultIsVisible';
    protected doneFlag : string              = 'defaultIsDone';
    protected noScroll                       = false;
    protected __fdn : string[]               = null;
    protected __form : ControlGroup;
    protected __controlGroup : ControlGroup;

    abstract context () : any;

    constructor ( private formModelService : FormModelService ,
                  private elementRef : ElementRef ,
                  private progressObserver : ProgressObserverService ,
                  private scrollService : ScrollService ) {
        setTimeout( ()=> {
            this.selectorName = arrayJoinByDash( this.__fdn ) + '-block';
            this.visibleFlag  = this.selectorName + 'IsVisible';
            this.doneFlag     = this.selectorName + 'IsDone';
            this.subscribeToScrollEvents();
        } );
    }

    updateSelectorName ( _customString : string|number ) {
        this.selectorName += '-' + _customString;
    }

    autoFocus () {
        /*
         * TODO : This should be a directive or something else.
         * */
        setTimeout( ()=> {
            let inputs = this.elementRef.nativeElement.getElementsByTagName( 'input' );
            if ( inputs && inputs.length > 0 ) {
                inputs[ 0 ].focus();
            }
        } , 100 )
    }

    onEdit () {
        this.isInSummaryState = false;
    }

    onNext () {
        if ( this.canGoNext ) {
            this.scrollService.scrollToNextUndoneBlock( this.__form );
            this.progressObserver.onProgress();
            TimerWrapper.setTimeout( () => {
                this.isInSummaryState = true;
            } , 1200 );
        }
    }

    get canGoNext () {
        return this.__controlGroup.valid;
    }

    protected subscribeToScrollEvents () {
        if ( this.noScroll ) {
            return;
        }
        this.scrollService.$scrolled.subscribe( ( changes ) => {
            if ( changes === this.selectorName ) {
                this.isInSummaryState = false;
                this.isActive         = true;
                this.autoFocus();
            }
        } );
    }

    // protected next ( nextBlock ) {
    //     // console.log(nextBlock);
    //     this.hasClickedOnOkButton = true;
    //     if ( this.controlService.getControlGroup( this._fdn ).valid ) {
    //         this.isInSummaryState = true;
    //         this.progressObserver.onProgress();
    //         TimerWrapper.setTimeout( () => {
    //             this.isInSummaryState = true;
    //         } , 1200 );
    //         const fdn = this.scrollService.scrollToNextUndoneBlock( this.controlService , this._fdn );
    //         this.formModelService.present( {
    //             action    : 'setFlag' ,
    //             flag      : nextBlock + 'IsVisible' ,
    //             flagValue : true
    //         } );
    //         if ( fdn ) {
    //             this.formModelService.present( {
    //                 action    : 'setFlag' ,
    //                 flag      : arrayJoinByDash( this._fdn ) + 'IsVisible' ,
    //                 flagValue : true
    //             } );
    //         }
    //     }
    // }
    protected tickDone () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.doneFlag ,
            flagValue : true
        } );
    }

    protected tickUnDone () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.visibleFlag ,
            flagValue : false
        } );
    }

    protected isCurrentBlockActive () {
        return this.isActive;
    }

    private resetBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.visibleFlag ,
            flagValue : false
        } );
        this.isInSummaryState = false;
    }
}
