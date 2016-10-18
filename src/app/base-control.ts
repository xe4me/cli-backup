import { FormControl , FormGroup } from '@angular/forms';
import { OnDestroy , OnInit , ChangeDetectorRef } from '@angular/core';
import { addDashOrNothing , isTrue , generateRandomString } from './modules/amp-utils/functions.utils';
export class BaseControl implements OnDestroy {
    public _controlGroup : FormGroup;
    public control : FormControl;
    public _errors;
    public _id                         = 'default';
    public keepControl : boolean;
    public createdAndJoinedControl     = false;
    public index;
    public _required : boolean         = false;
    public _disabled : boolean         = false;
    public _randomString               = 'default_random_id';
    public _customValidator : Function = () => {
    };

    public updateValidators () {
    }

    set errors ( errors ) {
        this._errors = errors;
    }

    get errors () {
        return this._errors;
    }

    set id ( value ) {
        this._id = value;
    }

    get id () {
        return this._id + addDashOrNothing( this.index );
    }

    set controlGroup ( _cg ) {
        this._controlGroup = _cg;
        this.createAndJoinControl();
    }

    get controlGroup () {
        return this._controlGroup;
    }

    ngOnInit () {
        this.createAndJoinControl();
    }

    ngOnDestroy () : any {
        if ( ! this.keepControl ) {
            if ( this.controlGroup.contains( this.id ) ) {
                this.controlGroup.removeControl( this.id );
            }
        }
    }

    createAndJoinControl () {
        if ( ! this.createdAndJoinedControl ) {
            this._randomString = generateRandomString();
            if ( this.controlGroup ) {
                if ( this.controlGroup.get( this.id ) ) {
                    this.control = <FormControl> this.controlGroup.get( this.id );
                } else {
                    this.control = new FormControl();
                    this.controlGroup.addControl( this.id , this.control );
                }
            } else {
                this.control = new FormControl();
            }
            if ( ! this.errors ) {
                this.errors = {};
            }
            this.control[ '_ampErrors' ] = {};
            Object.keys( this.errors ).map( ( errorName , i ) => {
                (<any> this.control)._ampErrors[ errorName ] = this.errors[ errorName ];
            } );
            this.createdAndJoinedControl = true;
        }
    }

    get disabled () {
        return this._disabled;
    }

    set disabled ( value ) {
        this._disabled = isTrue( value );
    }

    get required () {
        return this._required;
    }

    set required ( value ) {
        this._required = isTrue( value );
        this.updateValidators();
    }

    set customValidator ( customValidator : Function ) {
        this._customValidator = customValidator;
        this.updateValidators();
    }

    get customValidator () {
        return this._customValidator;
    }

    get randomizedId () {
        return this.id + '_' + this._randomString;
    }
}
