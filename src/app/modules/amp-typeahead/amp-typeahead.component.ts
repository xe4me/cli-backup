import {
    QueryList ,
    Component ,
    ViewChildren ,
    ContentChild ,
    TemplateRef ,
    EventEmitter ,
    OnInit ,
    Input ,
    Output ,
    ChangeDetectionStrategy ,
    ChangeDetectorRef ,
    AfterViewInit ,
    ViewChild ,
    OnDestroy
} from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { Observable , Subscription } from 'rxjs/Rx';
import { isPresent } from '../../util/functions.utils';
import { FocuserDirective } from "../../directives/focuser/focuser.directive";
import { AmpInputComponent } from "../../components/amp-input/amp-input.component";
import { KeyCodes } from "../../util/key-kodes.utils";
@Component( {
    selector        : 'amp-typeahead' ,
    queries         : {
        itemTemplate : new ContentChild( TemplateRef )
    } ,
    template        : require( './amp-typeahead.component.html' ) ,
    styles          : [ require( './amp-typeahead.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpTypeaheadComponent implements AfterViewInit, OnDestroy {
    @ViewChildren( FocuserDirective ) focusers : QueryList<FocuserDirective>;
    @ViewChild( 'input' ) ampInput : AmpInputComponent;
    @Output( 'selected' ) $selected      = new EventEmitter<any>();
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

    public static SELECTED_CONTROL_ID_POSTFIX = '-selected-item';
    private selectedControl : FormControl;
    private ApiSubscription : Subscription;
    private showNoResults                     = false;
    private NO_RESULT_DEBOUNCE_TIME           = 0;
    private INPUT_FOCUSER                     = 0;
    private LIST_FOCUSER                      = 1;
    private canViewAll                        = true;
    private selectedOption                    = {};
    private _required : boolean               = false;
    private _optionsHidden                    = true;

    get control () : FormControl {
        if ( this.controlGroup && this.controlGroup.contains( this.id ) ) {
            return (<FormControl>this.controlGroup.controls[ this.id ]);
        }
    }

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    set searchResult ( _result ) {
        if ( this.control ) {
            (<any>this.control).searchResult = _result;
        }
    }

    get searchResult () {
        return (<any>this.control).searchResult;
    }

    get isOptionsHidden () {
        return this._optionsHidden;
    }

    ngAfterViewInit () : any {
        this.selectedOption[ this.selectedItemValueIdentifier ] = null;
        this.selectedControl                                    = new FormControl();
        this.controlGroup.addControl( this.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX , this.selectedControl );
        if ( this.options ) {
            this.initWithOptions();
        } else if ( this.queryServiceCall ) {
            this.initWithApi();
        }
        return undefined;
    }

    ngOnDestroy () : void {
        if ( this.ApiSubscription ) {
            this.ApiSubscription.unsubscribe();
        }
    }

    private close = () : void => {
        this._optionsHidden = true;
        this.showNoResults  = false;
    };

    private open () {
        if ( this.isInSummaryState ) {
            return;
        }
        this._optionsHidden = false;
    };

    private onListFocusOut () {
        this.focusInput();
    }

    private onKeydown ( $event ) : void {
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

    private selectOption ( option ) : void {
        this.selectedOption = option;
        this.control.patchValue( option[ this.selectedItemValueIdentifier ].trim() );
        this.selectedControl.patchValue( JSON.stringify( option ) );
        this.$selected.emit( option );
        this.close();
        this.focusInput();
    }

    private onDownKeyPressed ( _direction ) : void {
        if ( this.focusers.toArray()[ this.LIST_FOCUSER ] ) {
            this.focusers.toArray()[ this.LIST_FOCUSER ].focus( _direction );
            this.markInputAsUnDirty(); // otherwise it shows the error because of the focus ou of the input
        }
    }

    private filter ( queryString : any ) : Observable<any> {
        return Observable.create( observer => {
            isPresent( queryString ) && queryString.length > 0 ?
                observer.next(
                    this.options.filter( item => item.title.toLowerCase().indexOf( queryString.toLowerCase() ) !== - 1 )
                ) :
                observer.next( this.options );
        } );
    }

    private focusInput () : void {
        if ( this.focusers.toArray()[ this.INPUT_FOCUSER ] ) {
            this.focusers.toArray()[ this.INPUT_FOCUSER ].focus( - 1 );
        }
    }

    private initWithOptions () {
        this.searchResult =
            this.control
                .valueChanges
                .distinctUntilChanged()
                .do( ( queryString ) => {
                    if ( isPresent( this.selectedOption ) && isPresent( queryString ) && queryString !== this.selectedOption[ this.selectedItemValueIdentifier ] ) {
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

    private initWithApi () : Subscription {
        this.searchResult = null;
        return this.ApiSubscription =
            this.control
                .valueChanges
                .debounceTime( 300 )
                .distinctUntilChanged()
                .do( ( queryString )=> {
                    if ( ! queryString ) {
                        this.clearSelectedItem();
                        this.searchResult = null;
                    }
                } )
                .filter(
                    x => x && x.length >= this.minTriggerLength && x.trim() !== this.selectedOption[ this.selectedItemValueIdentifier ] )
                .switchMap( queryString => this.queryServiceCall( queryString ) )
                .subscribe( ( result )=> {
                    this.clearSelectedItem();
                    this.open();
                    this.searchResult = result;
                    this._cd.markForCheck();
                    this.ampInput.checkErrors();
                } , ( error )=> {
                    this.clearSelectedItem();
                    this.close();
                    this.searchResult = null;
                    this._cd.markForCheck();
                    this.ampInput.checkErrors();
                } );
    }

    private resetSelectedOption () : void {
        this.selectedOption = null;
    }

    private markInputAsUnDirty () : void {
        setTimeout( () => {
            (<any> this.control)._dirty = false;
            this.control.updateValueAndValidity( {
                onlySelf  : false ,
                emitEvent : true
            } );
        } );
    }

    private clearSelectedItem () : void {
        this.selectedControl.patchValue( null );
        this.selectedOption[ this.selectedItemValueIdentifier ] = null;
    }
}
