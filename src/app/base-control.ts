import { FormControl, FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { addDashOrNothing, isTrue, generateRandomString } from './modules/amp-utils/functions.utils';
export class AmpFormGroup extends FormGroup {
    __fdn : (number|string)[];
}
export class BaseControl implements OnDestroy {
    public _controlGroup : AmpFormGroup;
    public control : FormControl;
    public _errors;
    public _id = 'default';
    public keepControl : boolean;
    public createdAndJoinedControl = false;
    public index;
    public _required : boolean = false;
    public _disabled : boolean = false;
    public _randomString = 'default_random_id';
    public isInSummaryState : boolean = false;
    public showErrorComponent : boolean = true;
    public _customValidator : Function = () => {
    };

    public updateValidators() {
    }

    public setAmpErrors () {
        if ( !this.errors ) {
            this.errors = {};
        }
        this.control[ '_ampErrors' ] = {};
        Object.keys( this.errors ).map( ( errorName, i ) => {
            (<any> this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
        } );
    }

    set errors( errors ) {
        this._errors = errors;
    }

    get errors() {
        return this._errors;
    }

    set id( value ) {
        this._id = value;
    }

    get id() {
        return this._id + addDashOrNothing( this.index );
    }

    set controlGroup( _cg ) {
        this._controlGroup = _cg;
        this.createAndJoinControl();
    }

    get controlGroup() {
        return this._controlGroup;
    }

    ngOnInit() {
        this.createAndJoinControl();
    }

    ngOnDestroy() : any {
        if ( !this.keepControl ) {
            if ( this.controlGroup && this.controlGroup.contains( this.id ) ) {
                this.controlGroup.removeControl( this.id );
            }
        }
    }

    createAndJoinControl() {
        if ( !this.createdAndJoinedControl ) {
            // if we have the fdn provided by controlGroup , use it otherwise generate a radnom string
            this.createRandomId();
            if ( this.controlGroup ) {
                if ( this.controlGroup.get( this.id ) ) {
                    this.control = <FormControl> this.controlGroup.get( this.id );
                } else {
                    this.control = new FormControl();
                    this.controlGroup.addControl( this.id, this.control );
                }
            } else {
                this.control = new FormControl();
            }
            this.setAmpErrors();
            this.createdAndJoinedControl = true;
        }
    }

    get disabled() : boolean {
        return (this.isInSummaryState || this._disabled) ? true : null;
    }

    set disabled( value ) {
        this._disabled = isTrue( value );
    }

    get required() {
        return this._required;
    }

    set required( value ) {
        this._required = isTrue( value );
        this.updateValidators();
    }

    set customValidator( customValidator : Function ) {
        this._customValidator = customValidator;
        this.updateValidators();
    }

    get customValidator() {
        return this._customValidator;
    }

    get randomizedId() {
        return this._randomString;
    }

    protected createRandomId() {
        if ( this.controlGroup && this.controlGroup.__fdn ) {
            this._randomString = [ ...this.controlGroup.__fdn, this.id ].join( '-' );
        } else {
            this._randomString = generateRandomString();
        }
    }
}
