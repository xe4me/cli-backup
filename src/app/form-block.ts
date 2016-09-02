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
    protected isActive : boolean             = true;
    protected hasClickedOnOkButton : boolean = false;
    protected selectorName : string          = 'default-form-block-selector-name';
    protected visibleFlag : string           = 'defaultIsVisible';
    protected doneFlag : string              = 'defaultIsDone';
    protected noScroll                       = false;
    protected __fdn : string[]               = null;
    protected __form : ControlGroup;
    protected __controlGroup : ControlGroup;

    constructor ( private formModelService : FormModelService ,
                  private progressObserver : ProgressObserverService ,
                  private scrollService : ScrollService ) {
        setTimeout( ()=> {
            this.selectorName = arrayJoinByDash( this.__fdn ) + '-block';
            this.visibleFlag  = this.selectorName + 'IsVisible';
            this.doneFlag     = this.selectorName + 'IsDone';
            this.subscribeToScrollEvents();
        } );
    }

    public updateSelectorName ( _customString : string|number ) {
        this.selectorName += '-' + _customString;
    }

    abstract context () : any;

    public get canGoNext () {
        return this.__controlGroup.valid;
        //return true;
    }

    protected onEdit () {
        this.isInSummaryState = false;
    }

    protected onNext ( nextBlock ) {
        this.scrollService.scrollToNextUndoneBlock( this.__form , this.__fdn );
        this.progressObserver.onProgress();
        TimerWrapper.setTimeout( () => {
            this.isInSummaryState = true;
        } , 1200 );
    }

    protected subscribeToScrollEvents () {
        if ( this.noScroll ) {
            return;
        }
        console.log( 'this.scrollService for ' + this.selectorName , this.scrollService );
        this.scrollService.$scrolled.subscribe( ( changes ) => {
            console.log( 'changes' , changes );
            if ( changes === this.selectorName ) {
                this.isInSummaryState = false;
                this.isActive         = true;
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
        //return this.formModelService.getFlags( this.visibleFlag );
        return this.isActive;
    }

    private resetBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.visibleFlag ,
            flagValue : false
        } );
        this.isInSummaryState     = false;
        this.hasClickedOnOkButton = false;
    }
}
