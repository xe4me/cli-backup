import {
    QueryList ,
    Component ,
    ViewChildren ,
    ContentChild ,
    TemplateRef ,
    OnInit
} from '@angular/core';
import { Control } from '@angular/common';
import { Observable } from 'rxjs/Rx';
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
                (keydown)='onKeydown($event)'     
                [autoFocus]="isActive"
                [label]='"A label here"'
                [isActive]='isActive'
                [isInSummaryState]='isInSummaryState'
                [id]='"someId"'
                [parentControl]='queryControl'
                [isRequired]='isRequired'>
            </my-md-input>
        </div>
      
        <ul focuser='list' (focusOut)="onListFocusOut()"  tabindex="-1" class='amp-auto-complete-options' [class.amp-auto-complete-hidden]='(searchResult | async)?.length==0 || isOptionsHidden'  >
            <li class='amp-auto-complete-option' tabindex='-1'>
                <strong>{{ label }}</strong>
            </li>
            <li (keydown.enter)="selectOption(option)" 
                (click)="selectOption(option)" 
                *ngFor='let option of searchResult | async ; let i = index' 
                class='amp-auto-complete-option' 
                [class.amp-auto-complete-active]='option.id == selectedOption.id'
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
        'label' ,
        'parentControl' ,
        'placeholder' ,
        'lengthTrigger' ,
        'options'
    ] ,
    directives : [ MdInputComponent , ClickedOutsideDirective , FocuserDirective ]
} )
export class AmpAutoCompleteComponent implements OnInit {
    @ViewChildren( FocuserDirective ) focusers : QueryList<FocuserDirective>;
    private QUERY_DEBOUNCE_TIME       = 200;
    private NO_RESULT_DEBOUNCE_TIME   = 400;
    private INPUT_FOCUSER             = 0;
    private LIST_FOCUSER              = 1;
    private parentControl;
    private options                   = [];
    private selectedOption : Option     = {
        title : '' ,
        id    : ''
    };
    private searchResult : Observable<Array<Option>>;
    private _required : boolean       = false;
    private queryControl : Control;
    private _optionsHidden            = true;
    private lengthTrigger : number = 0;
    private showNoResult              = false;

    ngOnInit () : any {
        this.parentControl = this.parentControl || new Control();
        this.queryControl  = new Control();
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

    private queryServiceCall          = ( queryValue : string ) : Observable<any> => {
        return new Observable<any>();
    };

    private get isOptionsHidden () {
        return this._optionsHidden || !this.queryControl.value;
    }

    private close = () : void => {
        this._optionsHidden = true;
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
            if ( !this.isOptionsHidden ) {
                this.onDownKeyPressed( keyCode );
                $event.preventDefault();
            } else {
                this.open();
            }
        }
    }

    private selectOption ( option ) {
        this.selectedOption = option;
        this.queryControl.updateValue( option.title );
        this.parentControl.updateValue( JSON.stringify( option ) );
        this.close();
        this.focusInput();
    }

    private onDownKeyPressed ( _direction ) {
        this.focusers.toArray()[ this.LIST_FOCUSER ].focus( _direction );
    }

    private filter ( queryString : any ) : Observable<any> {
        return Observable.create( observer => {
            observer.next( this.options.filter( item => item.title.indexOf( queryString ) !== -1 ) );
        } );
    }

    private focusInput () {
        this.focusers.toArray()[ this.INPUT_FOCUSER ].focus( -1 );
    }

    private initWithOptions () {
        this.searchResult =
            this.queryControl
                .valueChanges
                .debounceTime( this.QUERY_DEBOUNCE_TIME )
                .do( ( queryString ) => {
                    if ( queryString !== this.selectedOption.title ) {
                        this.open();
                        this.showNoResult = false;
                    }
                    return queryString;
                } )
                .distinctUntilChanged()
                .switchMap( ( queryString ) => {
                    return queryString && queryString.length > this.lengthTrigger ? this.filter( queryString ) : Observable.of( [] );
                } );
        this.searchResult
            .debounceTime( this.NO_RESULT_DEBOUNCE_TIME )
            .subscribe( ( result ) => {
                this.showNoResult = result.length === 0 && this.queryControl.value && this.queryControl.value.length > this.lengthTrigger;
            } );
    }

    private initWithApi () {
        this.searchResult =
            this.queryControl
                .valueChanges
                .debounceTime( this.QUERY_DEBOUNCE_TIME )
                .distinctUntilChanged()
                .switchMap( queryString => this.queryServiceCall( queryString ) );
    }
}
interface Option {
    title;
    id;
}
