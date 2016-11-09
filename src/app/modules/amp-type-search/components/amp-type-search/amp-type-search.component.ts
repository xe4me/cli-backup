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
@Component( {
    selector        : 'amp-type-search' ,
    queries         : {
        itemTemplate : new ContentChild( TemplateRef )
    } ,
    template        : require( './amp-type-search.component.html' ) ,
    styles          : [ require( './amp-type-search.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpTypeSearchComponent implements AfterViewInit, OnDestroy {
    public static SEARCH_ADDRESS_CONTROL_GROUP_NAME = 'searchControls';
    public static SELECTED_CONTROL_ID_POSTFIX       = '-selected-item';
    public selectedControl                          = new FormControl();
    public searchControlGroup                       = new FormGroup( {} );
    public isSearching : boolean                    = false;
    @ViewChildren( FocuserDirective ) focusers : QueryList<FocuserDirective>;
    @ViewChild( 'input' ) ampInput : AmpInputComponent;
    @Output( 'selected' ) $selected                 = new EventEmitter<any>();
    @Output( 'deSelected' ) $deSelected             = new EventEmitter<any>();
    @Output( 'errorCode' ) $errorCode               = new EventEmitter<any>();
    @Output( 'showResults' ) $showResults           = new EventEmitter<any>();

    @Input() maxHeight : string                     = '400px';
    @Input() id;
    @Input() selectedItemIdentifier                 = 'id';
    @Input() selectedItemValueIdentifier            = 'label';
    @Input() isInSummaryState                       = false;
    @Input() minTriggerLength                       = 50;
    @Input() maxLength                              = 50;
    @Input() errors                                 = {};
    @Input() selectLabel                            = null;
    @Input() label;
    @Input() controlGroup : FormGroup;
    @Input() placeholder;
    @Input() options                                = [];
    @Input() isActive;
    @Input() searchIconClick;
    private subscription : Subscription;
    private showNoResults : boolean                 = false;
    private INPUT_FOCUSER : number                  = 0;
    private LIST_FOCUSER : number                   = 1;
    private selectedOption                          = {};
    private _required : boolean                     = false;
    private _optionsHidden : boolean                = true;
    private doApiQuery : boolean                    = false;
    private filteredList : any[]                    = [];

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
        if ( this.searchControlGroup && this.searchControlGroup.contains( this.id ) ) {
            return (<FormControl> this.searchControlGroup.controls[ this.id ]);
        }
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
        this.searchControlGroup.addControl( this.id + AmpTypeSearchComponent.SELECTED_CONTROL_ID_POSTFIX , this.selectedControl );
        this.controlGroup.addControl( AmpTypeSearchComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME , this.searchControlGroup );
        this.initForApi();
        return undefined;
    }

    ngOnDestroy () : void {
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
    }

    private close = () : void => {
        this._optionsHidden = true;
        this.showNoResults  = false;
    };

    private onClick ( e ) {
        if (e.target.className.includes('icon--search')) {
            this.doSearchIconClick();
        }
    }

    private doSearchIconClick() {
        this.isSearching = true;
        this.searchIconClick(this.control.value || '')
            .subscribe((result) => {
                this.isSearching = false;
                this.clearSelectedItem();
                this.open();
                this.searchResult = result.json().payload;
                if ( result.json().errorCode ) {
                  this.$errorCode.emit({ errorCode: result.json().errorCode });
                }  else {
                    /* Hardcoding in a not found option. This is only temporary.*/
                    this.searchResult.push({ 'decisionWizard' : '------ Can\'t see your business name? Please try our decision wizard (coming soon). ------' });
                }
                this._cd.markForCheck();
                this.ampInput.checkErrors();
            } , ( error ) => {
                this.isSearching = false;
                this.clearSelectedItem();
                this.close();
                this.searchResult = null;
                this._cd.markForCheck();
                this.ampInput.checkErrors();
            } );
    }

    private open () {
        if ( this.isInSummaryState ) {
            return;
        }
        this._optionsHidden = false;
        this.$showResults.emit(!this._optionsHidden);
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
            }
        }
        if (KeyCodes.ENTER === keyCode){
            this.doSearchIconClick();
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

    private onDownKeyPressed ( _direction ) : void {
        if ( this.focusers.toArray()[ this.LIST_FOCUSER ] ) {
            this.focusers.toArray()[ this.LIST_FOCUSER ].focus( _direction );
            this.markInputAsUnDirty(); // otherwise it shows the error because of the focus ou of the input
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
        // this.searchResult = null;
        this.doApiQuery   = true;
        // return this.subscription =
        //     this.control
        //         .valueChanges
        //         .distinctUntilChanged()
        //         .do( ( queryString ) => {
        //             if ( ! queryString ) {
        //                 this.clearSelectedItem();
        //                 this.searchResult = null;
        //             }
        //         } )
        //         .filter(
        //             ( x ) => x && x.length >= this.minTriggerLength && x.trim() !== this.selectedOption[ this.selectedItemValueIdentifier ] )
        //         .switchMap( ( queryString ) => this.queryServiceCall( queryString ) )
        //         .subscribe( ( result ) => {
        //             this.clearSelectedItem();
        //             this.open();
        //             this.searchResult = result;
        //             this._cd.markForCheck();
        //             this.ampInput.checkErrors();
        //         } , ( error ) => {
        //             this.clearSelectedItem();
        //             this.close();
        //             this.searchResult = null;
        //             this._cd.markForCheck();
        //             this.ampInput.checkErrors();
        //         } );
        return undefined;
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
