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
import { isPresent , KeyCodes } from '../../../amp-utils';
import { FocuserDirective } from '../../../amp-directives';
import { AmpInputComponent } from '../../../amp-inputs';
import { addDashOrNothing } from '../../../amp-utils/functions.utils';
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
    public static SEARCH_ADDRESS_CONTROL_GROUP_NAME    = 'search';
    public static SEARCH_ADDRESS_QUERY_CONTROL_POSTFIX = 'query';
    public static SELECTED_CONTROL_ID_POSTFIX          = 'selectedItem';
    public selectedControl;
    public searchControlGroup;
    @ViewChildren( FocuserDirective ) focusers : QueryList<FocuserDirective>;
    @ViewChild( 'input' ) ampInput : AmpInputComponent;
    @Output( 'selected' ) $selected                    = new EventEmitter<any>();
    @Output( 'deSelected' ) $deSelected                = new EventEmitter<any>();
    @Input() maxHeight : string                        = '400px';
    @Input() id;
    @Input() selectedItemIdentifier                    = 'id';
    @Input() selectedItemValueIdentifier               = 'label';
    @Input() isInSummaryState                          = false;
    @Input() minTriggerLength                          = 0;
    @Input() errors                                    = {};
    @Input() selectLabel;
    @Input() label;
    @Input() controlGroup : FormGroup;
    @Input() placeholder;
    @Input() options;
    @Input() isActive;
    @Input() index;
    @Input() keepControl : boolean                     = false;
    private subscription : Subscription;
    private showNoResults : boolean                    = false;
    private INPUT_FOCUSER : number                     = 0;
    private LIST_FOCUSER : number                      = 1;
    private selectedOption                             = {};
    private _required : boolean                        = false;
    private _id : string                               = 'default';
    private _optionsHidden : boolean                   = true;
    private doApiQuery : boolean                       = false;
    private filteredList : any[]                       = [];

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    @Input() customValidator  = () : Function => {
        return ( c ) => {
            if ( c.value && c.value.length >= this.minTriggerLength ) {
                return this.selectedControl.value ? null : {
                    invalidSearch : {
                        text : c._ampErrors && c._ampErrors.invalidSearch ? c._ampErrors.invalidSearch : 'please' +
                        ' select a search result'
                    }
                };
            } else {
                return null;
            }
        };
    };
    @Input() queryServiceCall = ( queryValue : string ) : Observable<any> => {
        return new Observable<any>();
    };

    @Input( 'required' ) set required ( value : boolean ) {
        this._required = value;
    }

    get required () {
        return this._required;
    }

    get control () : FormControl {
        if ( this.searchControlGroup && this.searchControlGroup.contains( this.queryControlId + addDashOrNothing( this.index ) ) ) {
            return (<FormControl> this.searchControlGroup.controls[ this.queryControlId + addDashOrNothing( this.index ) ]);
        }
    }

    get queryControlId () {
        return AmpTypeaheadComponent.SEARCH_ADDRESS_QUERY_CONTROL_POSTFIX;
    }

    set searchResult ( _result ) {
        if ( this.control ) {
            (<any> this.control).searchResult = _result;
        }
    }

    get searchResult () {
        if ( this.control ) {
            return (<any> this.control).searchResult;
        }
    }

    get isOptionsHidden () : boolean {
        return this._optionsHidden;
    }

    ngAfterViewInit () : any {
        this.selectedOption[ this.selectedItemValueIdentifier ] = null;
        if ( this.options ) {
            this.initForOptions();
        } else if ( this.queryServiceCall ) {
            this.initForApi();
        }
        return undefined;
    }

    ngOnInit () : void {
        if ( this.controlGroup ) {
            if ( this.controlGroup.contains( AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME + addDashOrNothing( this.index ) ) ) {
                this.searchControlGroup = this.controlGroup.get( AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME + addDashOrNothing( this.index ) );
            } else {
                this.searchControlGroup = new FormGroup( {} );
                this.controlGroup.addControl( AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME + addDashOrNothing( this.index ) , this.searchControlGroup );
            }
        } else {
            this.searchControlGroup = new FormGroup( {} );
        }
        if ( this.searchControlGroup ) {
            if ( this.searchControlGroup.contains( AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX + addDashOrNothing( this.index ) ) ) {
                this.selectedControl = this.searchControlGroup.get( AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX + addDashOrNothing( this.index ) );
            } else {
                this.selectedControl = new FormControl();
                this.searchControlGroup.addControl( AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX + addDashOrNothing( this.index ) , this.selectedControl );
            }
        } else {
            this.selectedControl = new FormControl();
        }
    }

    ngOnDestroy () : void {
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
        if ( ! this.keepControl ) {
            if ( this.controlGroup.contains( AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME ) ) {
                this.controlGroup.removeControl( AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME );
            }
        }
    }

    iconRightClickHandler ( inputCmp : AmpInputComponent , control : FormControl ) {
        inputCmp.doOnBlurDirty = false;
        control.setValue( null );
    }

    private close = () : void => {
        if ( ! this._optionsHidden ) { // when we close , we want to make sure the validation has happened for input
            // because we manipulated the dirtyness of the input of keydown
            this.ampInput.checkErrors( true );
            this.ampInput.markControlAsDirty();
        }
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
                this.onDownKeyPressed( keyCode , $event );
                $event.preventDefault();
            } else {
                this.open();
            }
        }
    }

    private selectOption ( option ) : void {
        this.selectedOption = Object.assign( {} , option );
        this.control.setValue( this.selectedOption[ this.selectedItemValueIdentifier ].trim() );
        this.selectedControl.setValue( JSON.stringify( this.selectedOption ) );
        this.ampInput.checkErrors();
        this.$selected.emit( this.selectedOption );
        this.close();
        this.focusInput();
    }

    private onDownKeyPressed ( _direction , $event ) : void {
        if ( this.focusers.toArray()[ this.LIST_FOCUSER ] ) {
            this.focusers.toArray()[ this.LIST_FOCUSER ].focus( _direction );
            this.control.markAsPristine( {
                onlySelf : false
            } );
            this.ampInput.doOnBlurDirty = false;
            $event.preventDefault();
        }
    }

    private filter ( items , identifier , query , doFilter ) : Observable<any> {
        return this.filteredList = doFilter && isPresent( query ) ? items.filter(
            ( item ) => {
                return item[ identifier ] && item[ identifier ].toLowerCase().indexOf( query.toLowerCase() ) !== - 1;
            }
        ) : items;
    }

    private focusInput () : void {
        if ( this.focusers.toArray()[ this.INPUT_FOCUSER ] ) {
            this.focusers.toArray()[ this.INPUT_FOCUSER ].focus( - 1 );
        }
    }

    private initForApi () : Subscription {
        this.searchResult = null;
        this.doApiQuery   = true;
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
        return this.subscription =
            this.control
                .valueChanges
                .distinctUntilChanged()
                .do( ( queryString ) => {
                    if ( ! queryString ) {
                        this.clearSelectedItem();
                        this.searchResult = null;
                    }
                } )
                .filter(
                    ( x ) => x && x.length >= this.minTriggerLength && x.trim() !== this.selectedOption[ this.selectedItemValueIdentifier ] )
                .switchMap( ( queryString ) => this.queryServiceCall( queryString ) )
                .subscribe( ( result ) => {
                    this.clearSelectedItem();
                    this.open();
                    this.searchResult = result;
                    this._cd.markForCheck();
                    this.ampInput.checkErrors();
                } , ( error ) => {
                    this.clearSelectedItem();
                    this.close();
                    this.searchResult = null;
                    this._cd.markForCheck();
                    this.ampInput.checkErrors();
                    this.initForApi(); // If there is an error , subscription would die , so we need to subscribe again
                } );
    }

    private markInputAsUnDirty () : void {
        this.control.markAsPristine( {
            onlySelf : false
        } );
    }

    private clearSelectedItem () : void {
        this.selectedControl.setValue( null );
        this.selectedOption[ this.selectedItemValueIdentifier ] = null;
        this.$deSelected.emit( null );
    }

    private initForOptions () {
        this.searchResult = this.options;
        this.doApiQuery   = false;
        this.control
            .valueChanges
            .distinctUntilChanged()
            .subscribe( ( queryString ) => {
                if ( ! queryString || queryString !== this.selectedOption[ this.selectedItemValueIdentifier ] ) {
                    this.clearSelectedItem();
                    this.ampInput.checkErrors();
                }
                this.open();
            } );
    }
}
