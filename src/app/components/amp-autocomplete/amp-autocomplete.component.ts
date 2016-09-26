import {
    QueryList ,
    Component ,
    ViewChildren ,
    ContentChild ,
    TemplateRef ,
    EventEmitter ,
    OnInit , Input , Output , ChangeDetectionStrategy , ChangeDetectorRef , AfterViewInit
} from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { isPresent } from '../../util/functions.utils';
import { FocuserDirective , AmpInputComponent , ClickedOutsideDirective , KeyCodes } from '../../../../';
import { AmpLoadingComponent } from "../amp-loading/amp-loading.component";
@Component( {
    selector        : 'amp-auto-complete' ,
    queries         : {
        itemTemplate : new ContentChild( TemplateRef )
    } ,
    template        : `
    <div [clicked-outside]="close" class="amp-auto-complete">
        <div class='amp-auto-complete-control'>
            <amp-input
                class="1/1"
                focuser="input"
                iconRight='search'
                (click)='open()'          
                (keydown)='onKeydown($event)'     
                [autoFocus]="isActive"
                [errors]="errors"
                [label]='label'
                [isActive]='isActive'
                [isInSummaryState]='isInSummaryState'
                [id]='id'
                [controlGroup]='controlGroup'
                [customValidator]='customValidator'
                [minLength]='minTriggerLength'
                [required]='required'>
            </amp-input>
        </div>
        isOptionsHidden {{ isOptionsHidden }}
        <ul
            *ngIf="searchResult!==null && !isOptionsHidden"
            focuser='list'
            (focusOut)="onListFocusOut()"
            tabindex="-1"
            class='amp-auto-complete-options'>
            <li *ngIf="selectLabel" class='amp-auto-complete-option' tabindex='-1'>
                <strong>{{ selectLabel }}</strong>
            </li>
            <li (keydown.enter)="selectOption(option)" 
                (click)="selectOption(option)" 
                *ngFor='let option of searchResult  ; let i = index' 
                class='amp-auto-complete-option' 
                [class.amp-auto-complete-active]='option[selectedItemIdentifier] === selectedOption[selectedItemIdentifier]'
                [attr.tabindex]="i+1">
                <template
                    [ngTemplateOutlet]="itemTemplate"
                    [ngOutletContext]="{ option: option, index: index }">
                </template>
            </li>
        </ul>    
        <ul *ngIf="showNoResult" class="amp-auto-complete-options">
            <li class="amp-auto-complete-option" disabled >
                <strong>No results found</strong>
            </li>
        </ul>
    </div>
        ` ,
    styles          : [ require( './amp-autocomplete.component.scss' ).toString() ] ,
    directives      : [ AmpLoadingComponent , AmpInputComponent , ClickedOutsideDirective , FocuserDirective ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpAutoCompleteComponent implements AfterViewInit {
    @ViewChildren( FocuserDirective ) focusers : QueryList<FocuserDirective>;
    @Output( 'selected' ) $selected      = new EventEmitter<Option>();
    @Input() id;
    @Input() selectedItemIdentifier      = 'id';
    @Input() selectedItemValueIdentifier = 'label';
    @Input() queryServiceCall            = ( queryValue : string ) : Observable<any> => {
        return new Observable<any>();
    };
    @Input() customValidator;
    @Input() isInSummaryState            = false;
    @Input() minTriggerLength            = 0;
    @Input() errors                      = {};
    @Input() selectLabel;
    @Input() label;
    @Input() controlGroup : FormGroup;
    @Input() placeholder;
    @Input() lengthTrigger : number      = - 1;
    @Input() options;
    @Input() isActive;

    @Input( 'required' ) set required ( value : boolean ) {
        this._required = value;
    }

    get required () {
        return this._required;
    }

    private selectedControl : FormControl;
    private NO_RESULT_DEBOUNCE_TIME = 0;
    private INPUT_FOCUSER           = 0;
    private LIST_FOCUSER            = 1;
    private canViewAll              = true;
    private selectedOption          = {};
    private searchResult            = null;
    private _required : boolean     = false;
    private _optionsHidden          = true;

    private get control () : FormControl {
        if ( this.controlGroup && this.controlGroup.contains( this.id ) ) {
            return this.controlGroup.controls[ this.id ];
        }
    }

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    set searchResult ( _result ) {
        if ( this.control ) {
            this.control.searchResult = _result;
        }
    }

    get searchResult () {
        return this.control.searchResult;
    }

    ngAfterViewInit () : any {
        this.selectedOption[ this.selectedItemValueIdentifier ] = null;
        this.selectedControl                                    = new FormControl();
        this.controlGroup.addControl( this.id + '-selected-item' , this.selectedControl );
        if ( this.options ) {
            this.initWithOptions();
        } else if ( this.queryServiceCall ) {
            this.initWithApi();
        }
        return undefined;
    }

    private get isOptionsHidden () {
        return this._optionsHidden;
    }

    private close = () : void => {
        this._optionsHidden = true;
        this.showNoResults  = false;
    };

    private open () {
        if ( this.isInSummaryState ) {
            return;
        }
        // if ( this.firstOpen ) {
        //     setTimeout( () => {
        //         this.control.setValue( '' );
        //     } );
        //     this.firstOpen = false;
        // }
        this._optionsHidden = false;
    };

    private onListFocusOut () {
        this.focusInput();
    }

    private onKeydown ( $event ) {
        let keyCode = $event.keyCode;
        if ( keyCode === KeyCodes.DOWN || keyCode === KeyCodes.UP ) {
            if ( ! this.isOptionsHidden ) {
                this.onDownKeyPressed( keyCode );
                $event.preventDefault();
            } else {
                this.open();
            }
        }
    }

    private selectOption ( option ) {
        this.selectedOption = option;
        this.control.patchValue( option[ this.selectedItemValueIdentifier ].trim() );
        this.selectedControl.patchValue( JSON.stringify( option ) );
        this.$selected.emit( option );
        this.close();
        this.focusInput();
    }

    private onDownKeyPressed ( _direction ) {
        this.focusers.toArray()[ this.LIST_FOCUSER ].focus( _direction );
        this.markInputAsUnDirty();
    }

    private filter ( queryString : any ) : Observable<any> {
        return Observable.create( observer => {
            isPresent( queryString ) && queryString.length > 0 ?
                observer.next(
                    this.options.filter( item => item.title.toLowerCase().indexOf( queryString.toLowerCase() ) !== - 1 )
                ) : observer.next( this.options );
        } );
    }

    private focusInput () {
        this.focusers.toArray()[ this.INPUT_FOCUSER ].focus( - 1 );
    }

    private initWithOptions () {
        this.searchResult =
            this.control
                .valueChanges
                .distinctUntilChanged()
                .do( ( queryString ) => {
                    if ( isPresent( this.selectedOption ) && isPresent( queryString ) && queryString !== this.selectedOption.title ) {
                        this.resetSelectedOption();
                        this.open();
                        this.showNoResults = false;
                    }
                    return queryString;
                } )
                .switchMap( ( queryString ) => {
                    if ( this.canViewAll ) {
                        return this.filter( queryString );
                    } else {
                        return queryString && queryString.length > this.lengthTrigger ? this.filter( queryString ) : Observable.of( [] );
                    }
                } );
        this.searchResult
            .debounceTime( this.NO_RESULT_DEBOUNCE_TIME )
            .subscribe( ( result ) => {
                this.showNoResults = result.length === 0 && this.control.value && this.control.value.length > this.lengthTrigger;
            } );
    }

    private initWithApi () {
        this.searchResult = null;
        this.control
            .valueChanges
            .debounceTime( 300 )
            .distinctUntilChanged()
            .do( ( queryString )=> {
                console.log( '****** queryString ' , queryString );
                if ( ! queryString ) {
                    this.clearSelectedItem();
                    this.searchResult = null;
                }
            } )
            .filter(
                x => x && x.length >= this.minTriggerLength && x.trim() !== this.selectedOption[ this.selectedItemValueIdentifier ] )
            .switchMap( queryString => this.queryServiceCall( queryString ) )
            .subscribe( ( result )=> {
                console.log( 'Got the result' , result );
                this.clearSelectedItem();
                this.open();
                this.searchResult = result;
                this._cd.markForCheck();
            } , ( error )=> {
                console.log( 'ERRROR' , error );
                // this.clearSelectedItem();
                // this.open();
                // this.searchResult = result;
            } );
    }

    private resetSelectedOption () {
        this.selectedOption = null;
    }

    private markInputAsUnDirty () {
        setTimeout( () => {
            (<any> this.control)._dirty = false;
            this.control.updateValueAndValidity( {
                onlySelf  : false ,
                emitEvent : true
            } );
        } );
    }

    private clearSelectedItem () {
        this.selectedControl.patchValue( null );
        this.selectedOption[ this.selectedItemValueIdentifier ] = null;
    }
}
interface Option {
    title;
    id;
}
