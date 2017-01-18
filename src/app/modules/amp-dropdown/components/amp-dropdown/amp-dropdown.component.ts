import {
    QueryList,
    Component,
    ViewChildren,
    EventEmitter,
    ContentChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy,
    TemplateRef,
    Renderer,
    ElementRef
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { KeyCodes } from '../../../amp-utils';
import { FocuserDirective } from '../../../amp-directives';
import { RequiredValidator } from '../../../amp-utils/validations';
import { BaseControl } from '../../../../base-control';
export interface SelectActions {
    doMarkForCheck? : boolean;
    doFocus? : boolean;
    doMarkAsDirty? : boolean;
    doMarkAsTouched? : boolean;
}
@Component( {
    selector : 'amp-dropdown',
    template : require( './amp-dropdown.component.html' ),
    queries : {
        itemTemplate : new ContentChild( TemplateRef ),
        optionsRef : new ViewChildren( 'optionRef' ),
        focusers : new ViewChildren( FocuserDirective )
    },
    styles : [ require( './amp-dropdown.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush,
    inputs : [
        'errors',
        'id',
        'controlGroup',
        'maxHeight',
        'fieldItemKey',
        'fieldValueKey',
        'isInSummaryState',
        'showErrorComponent',
        'customValidator',
        'label',
        'required',
        'options',
        'index',
        'keepControl',
    ],
    outputs : [
        'selected'
    ]
} )
export class AmpDropdownComponent extends BaseControl implements AfterViewInit, OnDestroy {
    public static DROPDOWN_CONTROL_GROUP_NAME = 'Dropdown';
    public static QUERY_CONTROL_NAME = 'Query';
    public static SELECTED_CONTROL_NAME = 'SelectedItem';
    public selectedControl : FormControl;
    public control : FormControl;
    public dropdownControlGroup : FormGroup;
    public keepControl : boolean = false;
    public selected = new EventEmitter<any>();
    protected focusers : QueryList<FocuserDirective>;
    protected optionsRef : QueryList<TemplateRef<ElementRef>>;
    protected maxHeight : string = '400px';
    protected paddingAndMargins : number = 55;
    protected fieldItemKey = 'value';
    protected fieldValueKey = 'label';
    protected label;
    protected options;
    protected subscription : Subscription;
    protected INPUT_FOCUSER : number = 0;
    protected LIST_FOCUSER : number = 1;
    protected selectedOption = {};
    protected _optionsHidden : boolean = true;
    protected clearSearchTimeout;
    protected searchStr = '';
    private DO_NOT_FOCUS = false;

    constructor ( public _el : ElementRef, public _cd : ChangeDetectorRef, public _renderer : Renderer ) {
        super();
    }

    get isOptionsHidden () : boolean {
        return this._optionsHidden;
    }

    getGroupName () {
        return this.id + AmpDropdownComponent.DROPDOWN_CONTROL_GROUP_NAME;
    }

    ngOnInit () : void {
        super.ngOnInit();
        this.calculateMaxWidth( window.innerWidth );
    }

    ngAfterViewInit () : void {
        this.selectedOption[ this.fieldValueKey ] = null;
        this.selectedOption[ this.fieldItemKey ] = null;
        this.updateValidators();
        // check if control has value ( it's been retrieved , and if so , do the select)
        if ( this.control.value !== undefined ) {
            setTimeout( () => {
                this.findOptionAndSelect( this.control.value, this.DO_NOT_FOCUS );
            } );
        }
    }

    createAndJoinControl () {
        if ( !this.createdAndJoinedControl ) {
            // if we have the fdn provided by controlGroup , use it otherwise generate a radnom string
            this.createRandomId();
            if ( this.controlGroup ) {
                if ( this.controlGroup.contains( this.getGroupName() ) ) {
                    this.dropdownControlGroup = <FormGroup> this.controlGroup.get( this.getGroupName() );
                } else {
                    this.dropdownControlGroup = new FormGroup( {} );
                    this.controlGroup.addControl( this.getGroupName(), this.dropdownControlGroup );
                }
            } else {
                this.dropdownControlGroup = new FormGroup( {} );
            }
            if ( this.dropdownControlGroup ) {
                if ( this.dropdownControlGroup.contains( AmpDropdownComponent.SELECTED_CONTROL_NAME ) ) {
                    this.selectedControl = <FormControl> this.dropdownControlGroup.get( AmpDropdownComponent.SELECTED_CONTROL_NAME );
                } else {
                    this.selectedControl = new FormControl();
                    this.dropdownControlGroup.addControl( AmpDropdownComponent.SELECTED_CONTROL_NAME, this.selectedControl );
                }
                if ( this.dropdownControlGroup.contains( AmpDropdownComponent.QUERY_CONTROL_NAME ) ) {
                    this.control = <FormControl> this.dropdownControlGroup.get( AmpDropdownComponent.QUERY_CONTROL_NAME );
                } else {
                    this.control = new FormControl();
                    this.dropdownControlGroup.addControl( AmpDropdownComponent.QUERY_CONTROL_NAME, this.control );
                }
            } else {
                this.selectedControl = new FormControl();
                this.control = new FormControl();
            }
            this.setAmpErrors();
            this.createdAndJoinedControl = true;
            this.setupOnControlValueChangeHandler();
        }
    }

    ngOnDestroy () : any {
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
        if ( !this.keepControl ) {
            if ( this.controlGroup && this.controlGroup.contains( this.getGroupName() ) ) {
                this.controlGroup.removeControl( this.getGroupName() );
            }
        }
    }

    updateValidators () {
        if ( this.control ) {
            let validators = Validators.compose( [
                RequiredValidator.requiredValidation( this.required ),
                this.customValidator()
            ] );
            this.control.setValidators( validators );
            this.control.updateValueAndValidity( { emitEvent : false } );
        }
    }

    emptyAll () {
        this.selectedOption = {};
        this.selectedOption[ this.fieldValueKey ] = null;
        this.selectedOption[ this.fieldItemKey ] = null;
        this.control.setValue( null, {
            emitEvent : false
        } );
        this.selectedControl.setValue( null );
    }

    private close = () : void => {
        this._optionsHidden = true;
    }

    private open () {
        if ( this.isInSummaryState ) {
            return;
        }
        this._optionsHidden = false;
    } ;

    private onKeydown ( $event : KeyboardEvent ) : void {
        switch ( $event.keyCode ) {
            case KeyCodes.DOWN:
                return this.focusOnList( -1, $event );
            case KeyCodes.SPACE:
            case KeyCodes.ENTER:
                return this.toggleOptions( $event );
            case KeyCodes.LEFT_WINDOW_KEY:
            case KeyCodes.RIGHT_WINDOW_KEY:
                break;
            default:
                this.searchForFocus( $event );
        }
    }

    private getNodeForKeyboardSearch ( $event : KeyboardEvent ) : any {
        if ( this.clearSearchTimeout ) {
            clearTimeout( this.clearSearchTimeout );
        }
        this.clearSearchTimeout = setTimeout( () => {
            this.clearSearchTimeout = undefined;
            this.searchStr = '';
        }, 300 );
        // Support 1-9 on numpad
        let keyCode = $event.keyCode - (KeyCodes.isNumPadKey( $event ) ? 48 : 0);
        this.searchStr += String.fromCharCode( keyCode );
        if ( this.searchStr ) {
            let search = new RegExp( '^' + this.searchStr, 'i' );
            let index = 0;
            for ( const option of this.options) {
                if ( search.test( option[ this.fieldValueKey ] ) ) {
                    return <any> this.optionsRef.toArray()[ index ];
                }
                index++;
            }
        }
        return null;
    }

    private selectOption ( option, $event : KeyboardEvent, selectActions : SelectActions ) : void {
        if ( this.alreadySelectedThis( option ) ) {
            return;
        }
        if ( option === null ) {
            this.emptyAll();
        } else {
            this.selectedOption = Object.assign( {}, option );
            this.control.setValue( this.selectedOption[ this.fieldValueKey ].trim(), {
                emitEvent : false
            } );
            this.selectedControl.setValue( this.selectedOption[ this.fieldItemKey ] );
        }
        if ( selectActions.doMarkAsTouched && this.control.untouched ) {
            this.control.markAsTouched( {
                onlySelf : false
            } );
        }
        this.selected.emit( this.selectedOption );
        this.close();
        if ( selectActions.doFocus !== false ) {
            this.focusInput();
        }
        if ( $event ) {
            $event.preventDefault();
        }
        if ( selectActions.doMarkForCheck ) {
            this._cd.markForCheck();
        }
        if ( selectActions.doMarkAsDirty ) {
            this.control.markAsDirty();
        }
    }

    private toggleOptions ( $event : KeyboardEvent ) : void {
        this._optionsHidden = !this._optionsHidden;
        this.focusInput();
        $event.preventDefault();
    }

    private focusOnList ( _direction : number, $event : KeyboardEvent ) : void {
        this.open();
        if ( this.focusers.toArray()[ this.LIST_FOCUSER ] ) {
            this.focusers.toArray()[ this.LIST_FOCUSER ].focus( _direction );
            this.control.markAsPristine( {
                onlySelf : false
            } );
            $event.preventDefault();
        }
    }

    private focusInput () : void {
        if ( this.focusers.toArray()[ this.INPUT_FOCUSER ] ) {
            this.focusers.toArray()[ this.INPUT_FOCUSER ].focus( -1 );
        }
    }

    private searchForFocus ( $event : KeyboardEvent ) {
        let node = this.getNodeForKeyboardSearch( $event );
        if ( node && node.nativeElement ) {
            if ( this._optionsHidden ) {
                this._renderer.invokeElementMethod( node.nativeElement, 'click', [] );
            } else {
                this._renderer.invokeElementMethod( node.nativeElement, 'focus', [] );
            }
        }
    }

    private onTypeCharacter ( $event : KeyboardEvent ) {
        if ( $event.keyCode === KeyCodes.SPACE || $event.keyCode === KeyCodes.ENTER ) {
            this._renderer.invokeElementMethod( $event.target, 'click', [] );
        } else {
            this.searchForFocus( $event );
        }
    }

    private setupOnControlValueChangeHandler () {
        if ( this.control ) {
            this.subscription =
                this.control
                    .valueChanges
                    .subscribe( ( _change ) => {
                        this.findOptionAndSelect( _change, this.DO_NOT_FOCUS );
                    } );
        }
    }

    private findOptionAndSelect ( _change : any, doFocus ) {
        if ( _change !== undefined ) {
            if ( _change === null ) {
                return this.selectOption( _change, null, {
                    doMarkForCheck : true,
                    doFocus
                } );
            }

            for ( const option of this.options ) {
                if ( option[ this.fieldValueKey ] === _change || option[ this.fieldItemKey ] === _change ) {
                    return this.selectOption( option, null, {
                        doMarkForCheck : true,
                        doFocus
                    } );
                }
            }
            // if the value inside the control is not in the options , set it to null !!!!
            this.emptyAll();
        }
    }

    private alreadySelectedThis ( option : any ) {
        if ( this.selectedOption && option !== null ) {
            return this.selectedOption[ this.fieldItemKey ] === option[ this.fieldItemKey ];
        } else {
            return this.selectedOption[ this.fieldItemKey ] === option;
        }
    }

    private onResize ( event ) {
        this.calculateMaxWidth( event.target.innerWidth );
    }

    private calculateMaxWidth ( _windowWidth ) {
        let maxWidth = _windowWidth - this.paddingAndMargins;
        this._renderer.setElementStyle( this._el.nativeElement, 'max-width', maxWidth + 'px' );
    }
}
