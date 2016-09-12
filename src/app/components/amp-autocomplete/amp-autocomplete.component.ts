import {
    QueryList ,
    Component ,
    ViewChildren ,
    ContentChild ,
    TemplateRef ,
    EventEmitter ,
    OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { isPresent } from '../../util/functions.utils';
import { FocuserDirective , AmpInputComponent , ClickedOutsideDirective , KeyCodes } from '../../../../';
@Component( {
    selector   : 'amp-auto-complete' ,
    queries    : {
        itemTemplate : new ContentChild( TemplateRef )
    } ,
    template   : `
    <div [clicked-outside]="close" class="amp-auto-complete">
        <div class='amp-auto-complete-control'>
            <amp-input
                focuser="input"
                iconRight='search'
                (click)='open()'          
                (onBlur)='onBlur()'     
                (keydown)='onKeydown($event)'     
                [autoFocus]="isActive"
                [label]='label'
                [isActive]='isActive'
                [isInSummaryState]='isInSummaryState'
                [id]='id'
                [parentControl]='parentControl'
                [required]='required'>
            </amp-input>
        </div>
        <ul
            focuser='list'
            (focusOut)="onListFocusOut()"
            tabindex="-1"
            class='amp-auto-complete-options'
            [class.amp-auto-complete-hidden]='(searchResult | async)===null || isOptionsHidden'  >
            <li *ngIf="selectLabel" class='amp-auto-complete-option' tabindex='-1'>
                <strong>{{ selectLabel }}</strong>
            </li>
            <!--*ngFor='let option of ((searchResult | async)===null?options:(searchResult | async)) ; let i = index'-->
            <li (keydown.enter)="selectOption(option)" 
                (click)="selectOption(option)" 
                *ngFor='let option of searchResult | async ; let i = index' 
                class='amp-auto-complete-option' 
                [class.amp-auto-complete-active]='option.id == selectedOption?.id'
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
    styles     : [ require( './amp-autocomplete.component.scss' ).toString() ] ,
    inputs     : [
        'id' ,
        'queryServiceCall' , // This should return an observable to be consumed here
        'isInSummaryState' ,
        'selectControl' ,
        'required' ,
        'selectLabel' ,
        'label' ,
        'parentControl' ,
        'placeholder' ,
        'lengthTrigger' ,
        'options' ,
        'isActive'
    ] ,
    outputs    : [ 'change' ] ,
    directives : [ AmpInputComponent , ClickedOutsideDirective , FocuserDirective ]
} )
export class AmpAutoCompleteComponent implements OnInit {
    @ViewChildren( FocuserDirective ) focusers : QueryList<FocuserDirective>;
    private change                  = new EventEmitter<Option>();
    private QUERY_DEBOUNCE_TIME     = 0;
    private NO_RESULT_DEBOUNCE_TIME = 0;
    private INPUT_FOCUSER           = 0;
    private LIST_FOCUSER            = 1;
    private canViewAll              = true;
    private isInSummaryState        = false;
    private options                 = [];
    private selectedOption : Option;
    private searchResult : Observable<Array<Option>>;
    private _required : boolean     = false;
    private parentControl : FormControl;
    private selectControl : FormControl;
    private _optionsHidden          = true;
    private lengthTrigger : number  = - 1;
    private showNoResult            = false;
    private VALIDATION_DELAY        = 0;
    private firstOpen               = true;

    ngOnInit () : any {
        this.parentControl = this.parentControl || new FormControl();
        this.selectControl = this.selectControl || new FormControl();
        if ( this.options ) {
            this.initWithOptions();
        } else if ( this.queryServiceCall ) {
            this.initWithApi();
        }
        return undefined;
    }

    get required () {
        return this._required;
    }

    set required ( value : boolean ) {
        this._required = value;
    }

    private queryServiceCall = ( queryValue : string ) : Observable<any> => {
        return new Observable<any>();
    };

    private get isOptionsHidden () {
        return this._optionsHidden;
    }

    private close = () : void => {
        setTimeout( () => {
            this._optionsHidden = true;
            this.showNoResult   = false;
        } );
    };

    private open () {
        if ( this.isInSummaryState ) {
            return;
        }
        if ( this.firstOpen ) {
            setTimeout( () => {
                this.parentControl.setValue( '' );
            } );
            this.firstOpen = false;
        }
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
        this.parentControl.patchValue( option.title );
        this.selectControl.patchValue( JSON.stringify( option ) );
        this.change.emit( option );
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

    private onBlur ( $event ) {
        setTimeout( () => {
            if ( this.parentControl.value ) {
                if ( this.selectedOption === null ) {
                    let errors = Object.assign( {} , { invalid : true } , this.parentControl.errors || {} );
                    this.parentControl.setErrors( errors , {
                        emitEvent : true
                    } );
                } else {
                    if ( this.parentControl.errors && this.parentControl.errors.hasOwnProperty( 'invalid' ) ) {
                        delete (<any>this.parentControl.errors).invalid;
                    }
                    this.parentControl.setErrors( this.parentControl.errors , {
                        emitEvent : true
                    } );
                }
            }
        } , this.VALIDATION_DELAY );
    }

    private initWithOptions () {
        this.searchResult =
            this.parentControl
                .valueChanges
                .distinctUntilChanged()
                .do( ( queryString ) => {
                    if ( isPresent( this.selectedOption ) && isPresent( queryString ) && queryString !== this.selectedOption.title ) {
                        this.resetSelectedOption();
                        this.open();
                        this.showNoResult = false;
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
                this.showNoResult = result.length === 0 && this.parentControl.value && this.parentControl.value.length > this.lengthTrigger;
            } );
    }

    private initWithApi () {
        this.searchResult =
            this.parentControl
                .valueChanges
                .debounceTime( this.QUERY_DEBOUNCE_TIME )
                .switchMap( queryString => this.queryServiceCall( queryString ) );
    }

    private resetSelectedOption () {
        this.selectedOption = null;
        if ( this.selectControl )
            this.selectControl.updateValue( null );
    }

    private markInputAsUnDirty () {
        setTimeout( () => {
            (<any>this.parentControl)._dirty = false;
            this.parentControl.updateValueAndValidity( {
                onlySelf  : false ,
                emitEvent : true
            } );
        } );
    }
}
interface Option {
    title;
    id;
}
