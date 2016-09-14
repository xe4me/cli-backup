import { ElementRef , ChangeDetectorRef , AfterViewInit , OnDestroy , ViewChild } from '@angular/core';
import { arrayJoinByDash } from './util/functions.utils';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormModelService } from './services/form-model/form-model.service';
import { ProgressObserverService } from './services/progress-observer/progress-observer.service';
import { ScrollService } from './services/scroll/scroll.service';
export abstract class FormBlock implements AfterViewInit, OnDestroy {
    @ViewChild( 'focusZone' ) focusZone;
    protected isInSummaryState : boolean     = false;
    protected isActive : boolean             = false;
    protected hasClickedOnOkButton : boolean = false;
    protected selectorName : string          = 'default-form-block-selector-name';
    protected visibleFlag : string           = 'defaultIsVisible';
    protected doneFlag : string              = 'defaultIsDone';
    protected noScroll                       = false;
    protected __fdn : string[]               = null;
    protected __form : FormGroup;
    protected __controlGroup : FormGroup;
    private scrollSubscription : Subscription;

    abstract context () : any;

    constructor ( private formModelService : FormModelService ,
                  private elementRef : ElementRef ,
                  private _cd : ChangeDetectorRef ,
                  private progressObserver : ProgressObserverService ,
                  private scrollService : ScrollService ) {
    }

    ngAfterViewInit () {
        this.selectorName = arrayJoinByDash( this.__fdn ) + '-block';
        this.visibleFlag  = this.selectorName + 'IsVisible';
        this.doneFlag     = this.selectorName + 'IsDone';
        this.subscribeToScrollEvents();
        this._cd.markForCheck();
    }

    ngOnDestroy () {
        this.unSubscribeToScrollEvents();
    }

    updateSelectorName ( _customString : string|number ) {
        this.selectorName += '-' + _customString;
    }

    autoFocus () {
        /*
         * TODO : This should be a directive or something else.
         * */
        setTimeout( () => {
            let inputs = this.elementRef.nativeElement.getElementsByTagName( 'input' );
            if ( ! inputs ) {
                inputs = this.elementRef.nativeElement.getElementsByTagName( 'textarea' );
                if ( ! inputs ) {
                } else {
                    inputs = this.elementRef.nativeElement.getElementsByTagName( 'select' );
                }
            }
            if ( inputs && inputs.length > 0 ) {
                inputs[ 0 ].focus();
            }
        } , 100 );
    }

    onEdit () {
        this.isInSummaryState = false;
    }

    onNext () {
        if ( this.canGoNext ) {
            this.scrollService.scrollToNextUndoneBlock( this.__form );
            this.progressObserver.onProgress();
            setTimeout( () => {
                this.isInSummaryState = true;
            } , 1200 );
        }
    }

    get canGoNext () {
        return this.__controlGroup.valid;
    }

    protected subscribeToScrollEvents () {
        if ( ! this.noScroll ) {
            this.scrollSubscription = this.scrollService.$scrolled.subscribe( ( changes ) => {
                if ( changes === this.selectorName ) {
                    this.isInSummaryState = false;
                    this.isActive         = true;
                    this.autoFocus();
                    this._cd.markForCheck();
                }
            } );
        }
    }

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

    private resetBlock () {
        this.formModelService.present( {
            action    : 'setFlag' ,
            flag      : this.visibleFlag ,
            flagValue : false
        } );
        this.isInSummaryState = false;
    }

    private unSubscribeToScrollEvents () {
        this.scrollSubscription.unsubscribe();
    }
}
