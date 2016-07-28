import { Component , OnInit , EventEmitter , Pipe , PipeTransform } from '@angular/core';
import { Control } from '@angular/common';
import { Observable } from "rxjs/Rx";
import { FocuserDirective , MdInputComponent , ClickedOutsideDirective , KeyCodes } from "../../../../";
import { RequestOptions , Headers , Http } from "@angular/http";
@Component( {
    selector   : 'amp-autocomplete' ,
    template   : `
    <div [clicked-outside]="close" class="amp-autocomplete">
        <div class='control'>
            <focuser [focuser]="$inputFocus" focus-target="input">
                <my-md-input
                    iconRight='search'
                    #input
                    tabindex="-1"
                    (keydown)='onKeydown($event)'     
                    style="width: 100% !important;"
                    [autoFocus]="isActive"
                    [label]='"A label here"'
                    [isActive]='isActive'
                    [isInSummaryState]='isInSummaryState'
                    [id]='"someId"'
                    [parentControl]='queryControl'
                    [isRequired]='isRequired'>
                </my-md-input>
            </focuser>
        </div>
      <focuser [focuser]="$onDownKey" hasList="true" (focusOut)="onListFocusOut()" >
        <ul tabindex="-1" class='options' [class.hidden]='(searchResult | async)?.length==0 || isOptionsHidden'  >
            <li class='option' tabindex='-1'>
                <strong>{{ label }}</strong>
            </li>
            <li (keydown.enter)="selectOption(option)" 
                (click)="selectOption(option)" 
                *ngFor='let option of searchResult | async ; let i = index' 
                class='option' 
                [class.active]='option.id == selectedOption.id'
                [attr.tabindex]="i+1" 
                [attr.data-option-val]='option.id'>
                {{ option.title }}
            </li>
        </ul>    
       </focuser>
        <ul *ngIf="showNoResult" 
        class="options">
            <li class="option" disabled >
                <strong>No results found</strong>
            </li>
        </ul>
    </div>
        ` ,
    styles     : [ require( './amp-autocomplete.component.scss' ).toString() ] ,
    inputs     : [
        'id' ,
        'isInSummaryState' ,
        'label' ,
        'parentControl' ,
        'apiUrl' ,
        'placeholder' ,
        'minLengthTrigger' ,
        'options' ,
        'tabindex' ,
        'isActive'
    ] ,
    directives : [ MdInputComponent , ClickedOutsideDirective , FocuserDirective ]
} )
export class AmpAutocompleteComponent implements OnInit {
    private parentControl;
    private apiUrl;
    private options                   = [];
    private selectedOption : Item     = {
        title : '' ,
        id    : ''
    };
    private searchResult : Observable<Array<Item>>;
    private _required : boolean       = false;
    private queryControl : Control;
    private _optionsHidden            = true;
    private $onDownKey                = new EventEmitter<string>();
    private $inputFocus               = new EventEmitter<string>();
    private minLengthTrigger : number = 0;
    private showNoResult              = false;

    ngOnInit () : any {
        this.queryControl = this.parentControl || new Control();
        if ( this.options ) {
            this.initWithOptions();
        } else if ( this.apiUrl ) {
            this.initWithApi()
        }
        return undefined;
    }

    public queryService ( queryValue : string ) : Observable<any> {
        let headers = new Headers(
            {
                'Content-Type' : 'application/json;charset=UTF-8' ,
            } );
        let options = new RequestOptions( { headers : headers } );
        return this.http
                   .get( 'https://api-nio-ddc.digital-pilot.ampaws.com.au/ddc/secure/api/nio/occupations' , options )
                   .map( res => {
                       console.log( 'res' , res );
                       return res.json().payload;
                   } )
    }

    constructor ( private http : Http ) {
    }

    get isRequired () {
        return this._required;
    }

    set isRequired ( value : boolean ) {
        this._required = value;
    }

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
        this.close();
        this.focusInput();
    }

    private onDownKeyPressed ( _direction ) {
        this.$onDownKey.emit( _direction );
    }

    private filter ( queryString : any ) : Observable<any> {
        return Observable.create( observer => {
            observer.next( this.options.filter( item => item.title.indexOf( queryString ) !== -1 ) );
        } );
    }

    private focusInput () {
        this.$inputFocus.emit( 'focus' );
    }

    private initWithOptions () {
        this.searchResult =
            this.queryControl
                .valueChanges
                .debounceTime( 200 )
                .do( ( queryString )=> {
                    if ( queryString !== this.selectedOption.title ) {
                        this.open();
                        this.showNoResult = false;
                    }
                    return queryString;
                } )
                .distinctUntilChanged()
                .switchMap( ( queryString )=> {
                    return queryString && queryString.length > this.minLengthTrigger ? this.filter( queryString ) : Observable.of( [] )
                } );
        this.searchResult
            .debounceTime( 400 )
            .subscribe( ( result )=> {
                this.showNoResult = result.length === 0 && this.queryControl.value && this.queryControl.value.length > this.minLengthTrigger;
            } )
    }

    private initWithApi () {
        this.searchResult =
            this.queryControl
                .valueChanges
                .debounceTime( 300 )
                .distinctUntilChanged()
                .switchMap( queryString => this.queryService( queryString ) );
    }
}
interface Item {
    title;
    id;
}