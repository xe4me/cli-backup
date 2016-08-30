import { Control , ControlArray , ControlGroup } from '@angular/common';
import { forwardRef , provide , Provider } from '@angular/core';
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
/**
 * This class is both a Abstract Class (i.e. Java like Abstract, property and method implementation that are common) and
 * a Class-Interface (https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#class-interface)
 */
export abstract class FormBlock {
    protected isInSummaryState : boolean     = false;
    protected hasClickedOnOkButton : boolean = false;
    protected _fdn : string[]                = null;
    protected selectorName : string          = 'default-form-block-selector-name';
    private controlGroup : ControlGroup;

    constructor ( private formModelService : FormModelService ,
                  private progressObserver : ProgressObserverService ) {
        setTimeout( ()=> {
            this.selectorName = arrayJoinByDash( this._fdn );
        } );
    }

    public updateSelectorName ( _customString : string|number ) {
        this.selectorName += '-' + _customString;
    }

    abstract context () : any;

    public getMyVisibleFlagString () {
        return this.selectorName + 'IsVisible';
    }

    public getMyDoneFlagString () {
        return this.selectorName + 'IsDone';
    }

    public get canGoNext () {
        //return this.controlGroup.valid;
        return true;
    }

    protected onEdit () {
        this.isInSummaryState = false;
    }

    protected onNext ( nextBlock ) {
        //this.scrollService.scrollToNextUndoneBlock( this.controlService , this._fdn );
        this.progressObserver.onProgress();
        TimerWrapper.setTimeout( () => {
            this.isInSummaryState = true;
        } , 1200 );
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
            flag      : this.getMyDoneFlagString ,
            flagValue : true
        } );
    }

    protected tickUnDone () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.getMyDoneFlagString ,
            flagValue : false
        } );
    }

    protected isCurrentBlockActive () {
        return this.formModelService.getFlags( this.getMyVisibleFlagString() );
    }

    private resetBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.getMyVisibleFlagString ,
            flagValue : false
        } );
        this.isInSummaryState     = false;
        this.hasClickedOnOkButton = false;
    }
}
