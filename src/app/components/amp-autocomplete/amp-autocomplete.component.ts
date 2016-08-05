import {
    QueryList ,
    Component ,
    ViewChildren ,
    ContentChild ,
    TemplateRef ,
    EventEmitter ,
    OnInit
} from '@angular/core';
import { Control } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { isPresent } from '../../util/functions.utils'
import { FocuserDirective , MdInputComponent , ClickedOutsideDirective , KeyCodes } from '../../../../';
@Component( {
    selector   : 'amp-auto-complete' ,
    queries    : {
        itemTemplate : new ContentChild( TemplateRef )
    } ,
    template   : `
    <div [clicked-outside]="close" class="amp-auto-complete">
        <div class='amp-auto-complete-control'>
            <my-md-input
                focuser="input"
                iconRight='search'
                (click)='open()'     
                (onFocus)='onFocus()'     
                (onBlur)='onBlur()'     
                (keydown)='onKeydown($event)'     
                [autoFocus]="isActive"
                [label]='label'
                [isActive]='isActive'
                [isInSummaryState]='isInSummaryState'
                [id]='id'
                [parentControl]='parentControl'
                [isRequired]='isRequired'>
            </my-md-input>
        </div>
        <ul
            focuser='list'
            (focusOut)="onListFocusOut()"
            tabindex="-1"
            class='amp-auto-complete-options'
            [class.amp-auto-complete-hidden]='(searchResult | async)?.length==0 || isOptionsHidden'  >
            <li *ngIf="selectLabel" class='amp-auto-complete-option' tabindex='-1'>
                <strong>{{ selectLabel }}</strong>
            </li>
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
        'isRequired' ,
        'selectLabel' ,
        'label' ,
        'parentControl' ,
        'placeholder' ,
        'lengthTrigger' ,
        'options'
    ] ,
    outputs    : [ 'change' ] ,
    directives : [ MdInputComponent , ClickedOutsideDirective , FocuserDirective ]
} )
export class AmpAutoCompleteComponent implements OnInit {
    @ViewChildren( FocuserDirective ) focusers : QueryList<FocuserDirective>;
    private change                  = new EventEmitter<Option>();
    private QUERY_DEBOUNCE_TIME     = 0;
    private NO_RESULT_DEBOUNCE_TIME = 0;
    private INPUT_FOCUSER           = 0;
    private LIST_FOCUSER            = 1;
    private canViewAll              = true;
    private options                 = [];
    private selectedOption : Option;
    private searchResult : Observable<Array<Option>>;
    private _required : boolean     = false;
    private parentControl : Control;
    private selectControl : Control;
    private _optionsHidden          = true;
    private lengthTrigger : number  = - 1;
    private showNoResult            = false;
    private VALIDATION_DELAY        = 300;

    ngOnInit () : any {
        this.resetSelectedOption();
        this.parentControl = this.parentControl || new Control();
        this.selectControl = this.selectControl || new Control();
        if ( this.options ) {
            this.initWithOptions();
        } else if ( this.queryServiceCall ) {
            this.initWithApi();
        }
        return undefined;
    }

    get isRequired () {
        return this._required;
    }

    set isRequired ( value : boolean ) {
        this._required = value;
    }

    private queryServiceCall = ( queryValue : string ) : Observable<any> => {
        return new Observable<any>();
    };

    private get isOptionsHidden () {
        return this._optionsHidden;
    }

    private close = () : void => {
        setTimeout( ()=> {
            this._optionsHidden = true;
            this.showNoResult   = false;
        } , 0 );
    };

    private open () {
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
        this.parentControl.updateValue( option.title );
        this.selectControl.updateValue( JSON.stringify(option) );
        this.change.emit( option );
        this.close();
        this.focusInput();
    }

    private onDownKeyPressed ( _direction ) {
        this.focusers.toArray()[ this.LIST_FOCUSER ].focus( _direction );
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
        setTimeout( ()=> {
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
        } , this.VALIDATION_DELAY )
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
        if(this.selectControl)
            this.selectControl.updateValue( null );
    }
}
interface Option {
    title;
    id;
}
