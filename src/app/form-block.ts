import {
    ElementRef , ChangeDetectorRef , AfterViewInit , OnDestroy , ViewContainerRef ,
    ComponentRef
} from '@angular/core';
import { arrayJoinByDash , DomUtils } from './modules/amp-utils';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormModelService } from './services/form-model/form-model.service';
import { ProgressObserverService } from './services/progress-observer/progress-observer.service';
import { ScrollService } from './services/scroll/scroll.service';
import { FormDefinition } from './interfaces/form-def.interface';
export abstract class FormBlock implements AfterViewInit, OnDestroy {
    public autoFocusOn;
    protected isInSummaryState : boolean     = false;
    protected isActive : boolean             = false;
    protected hasClickedOnOkButton : boolean = false;
    protected selectorName : string          = 'default-form-block-selector-name';
    protected noScroll                       = false;
    /*
     * __fdn : the fully distinguished name to this block :
     * E.g : ['Application','SomeSection','ContactDetails'];
     * */
    protected __fdn : (number|string)[];
    /*
     * __form : The overal form , this is accessabel in all the blocks and is the same everywhere
     * */
    protected __form : FormGroup;
    /*
     * controlGroup : The control group that created specificically for this block
     * */
    protected __controlGroup : FormGroup;
    protected __sectionName : string;
    /*
     * __removeAt : Will remove the next block , need to specify the current block which is ViewContainerRef
     * */
    protected __removeAt : ( index : number ) => Promise<number>;
    /*
     * __removeNext : Will remove the next block , need to specify the current block which is ViewContainerRef
     * */
    protected __removeNext : ( viewContainerRef : ViewContainerRef ) => Promise<number>;
    /*
     * __removeAllAfter : Will remove all the blocks after current block if they're in the same conainer
     * E.g : If you're inside menu frame , you cannot delete review block if they not in the same blocks array in
     * form definition
     * */
    protected __removeAllAfter : ( viewContainerRef : ViewContainerRef ) => Promise<number>;
    /*
     * __removeAllAfterIndex
     * Same as removeAllAfter, except you just need to specify an index , it'll nicely remove all after that index
     * */
    protected __removeAllAfterIndex : ( index : number ) => Promise<any>;
    /*
     * __getIndex : Will give you your index in the current container
     * */
    protected __getIndex : ( viewContainerRef : ViewContainerRef ) => number;
    /*
     * __loadNext : Will load a chunk of form definition after the current block
     * E.g :
     * @example
     let toBeLoadedBlock = {
     "equityHolders": {
     "name": "EquityHolders",
     "prettyName": "Equity holders",
     "blockType": "EquityHoldersBlockComponent",
     "blockLayout": "INLINE",
     "commonBlock": false,
     "path": "blocks/equity-holders/equity-holders.component",
     }
     }
     __loadNext(toBeLoadedBlock , this.viewContainerRef);
     * */
    protected __loadNext : ( def : FormDefinition , viewContainerRef : ViewContainerRef ) => Promise<ComponentRef<any>>;
    /*
     * __loadAt
     * Same as loadNext , except load at a specific index without telling where you are(viewContainerRef)
     * */
    protected __loadAt : ( def : FormDefinition , index : number ) => Promise<ComponentRef<any>>;
    /*
     * __loadAt
     * Same as loadNext , except loads an array of blocks
     * */
    protected __loadAllNext : ( _defs : FormDefinition[] ,
                                _viewContainerRef : ViewContainerRef ) => Promise<ComponentRef<any>[]>;
    /*
     * __custom : All the custom properties that you've specified in your form definition chunk will be accesable
     @example
     let toBeLoadedBlock = {
     "equityHolders": {
     "name": "EquityHolders",
     "prettyName": "Equity holders",
     "blockType": "EquityHoldersBlockComponent",
     "blockLayout": "INLINE",
     "commonBlock": false,
     "path": "blocks/equity-holders/equity-holders.component",
     "custom":{
     "whateveField":"whatever value "
     }
     }
     }
     Then inside the class you can access to whateverField like :
     console.log(this.__custom.whateverField); // it's amazing I know :)
     * */
    protected __custom : any;
    /*
     * __isRetrieved :
     * If this block has been created with a hydrated form ( form that has value and conteols , or in
     * another words ,
     * a retrieved form ) , this variable will be true
     * */
    protected __isRetrieved : boolean;
    protected visibleFlag : string = 'defaultIsVisible';
    protected doneFlag : string    = 'defaultIsDone';
    private scrollSubscription : Subscription;
    private domUtils : DomUtils    = null;
    private scrollOffset           = 80;

    constructor ( protected formModelService : FormModelService ,
                  protected elementRef : ElementRef ,
                  protected _cd : ChangeDetectorRef ,
                  protected progressObserver : ProgressObserverService ,
                  protected scrollService : ScrollService ) {
        this.domUtils = new DomUtils();
    }

    context () {
        return this;
    }

    ngAfterViewInit () {
        this.selectorName = arrayJoinByDash( this.__fdn ) + '-block';
        this.visibleFlag  = this.selectorName + 'IsVisible';
        this.doneFlag     = this.selectorName + 'IsDone';
        this.subscribeToScrollEvents();
        if ( this.__isRetrieved ) {
            this.setToTouchedAndSummaryState();
        }
        this._cd.markForCheck();
    }

    ngOnDestroy () {
        this.unSubscribeFromEvents();
    }

    updateSelectorName ( _customString : string|number ) {
        this.selectorName += '-' + _customString;
    }

    autoFocus () {
        setTimeout( () => {
            if ( this.autoFocusOn ) {
                this.autoFocusOn.focus();
            } else {
                let inputs = this.elementRef.nativeElement.getElementsByTagName( 'input' );
                if ( ! inputs ) {
                    inputs = this.elementRef.nativeElement.getElementsByTagName( 'textarea' );
                }
                if ( inputs && inputs.length > 0 ) {
                    for ( let i = 0 ; i < inputs.length ; i ++ ) {
                        if ( this.domUtils.isVisible( inputs[ i ] ) ) {
                            inputs[ i ].focus();
                            break;
                        }
                    }
                }
            }
        } , 100 );
    }

    onEdit () {
        this.isInSummaryState = false;
        this.scrollService.$scrolled.emit( this.selectorName );
    }

    setToTouchedAndSummaryState () {
        this.__controlGroup.markAsTouched();
        this.isInSummaryState = true;
        this.isActive         = true;
    }

    onNext () {
        if ( this.canGoNext ) {
            this.scrollService.scrollToNextUndoneBlock( this.__form , this.scrollOffset );
            this.progressObserver.onProgress( this.__fdn );
            this.formModelService.save( this.__form.value );
            let onNextScrolled = this.scrollService.$scrolled.subscribe( () => {
                this.isInSummaryState = true;
                this._cd.markForCheck();
                onNextScrolled.unsubscribe();
            } );
        }
    }

    get canGoNext () {
        return this.__controlGroup.valid;
    }

    protected subscribeToScrollEvents () {
        if ( ! this.noScroll ) {
            this.scrollSubscription = this.scrollService.$scrolled.subscribe( ( changes ) => {
                if ( changes.componentSelector && changes.componentSelector === this.selectorName ) {
                    this.isInSummaryState = false;
                    this.isActive         = true;
                    this.autoFocus();
                    this._cd.markForCheck();
                }
            } );
        }
    }

    private resetBlock () {
        this.isInSummaryState = false;
    }

    private unSubscribeFromEvents () {
        if ( this.scrollSubscription ) {
            this.scrollSubscription.unsubscribe();
        }
    }
}
