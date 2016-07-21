"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var input_1 = require('@angular2-material/input');
var lang_1 = require('@angular/core/src/facade/lang');
var MyInputComponent = (function () {
    // ngOnChanges ( changes ) : any {
    //     if ( changes.hasOwnProperty( 'isInSummaryState' ) ) {
    //         if ( changes.isInSummaryState.currentValue === true ) {
    //             this.shrink();
    //         } else {
    //             this.initiateInputWidth();
    //         }
    //     }
    //     return undefined;
    // }
    function MyInputComponent(_cd, el) {
        this._cd = _cd;
        this.el = el;
        this._required = false;
        this.showLabel = true;
        this.tolowerCase = false;
        this.toupperCase = false;
        this.onAdjustWidth = new core_1.EventEmitter();
        this.onEnter = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onKeyup = new core_1.EventEmitter();
    }
    MyInputComponent.prototype.ngAfterViewInit = function () {
        this.inputWidth = this.el.nativeElement.offsetWidth;
        if (this.inputWidth === 0) {
            this.inputWidth = 300;
        }
        this.tempClassNames = this.el.nativeElement.className;
        this.el.nativeElement.className = '';
        this.el.nativeElement.style.width = this.inputWidth + 'px';
        this.updateValitators();
        this._cd.detectChanges();
        return undefined;
    };
    Object.defineProperty(MyInputComponent.prototype, "isRequired", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = this.isTrue(value);
            this.updateValitators();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyInputComponent.prototype, "valMinLength", {
        get: function () {
            return this._valMinLength;
        },
        set: function (value) {
            this._valMinLength = value;
            this.updateValitators();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyInputComponent.prototype, "valMaxLength", {
        get: function () {
            return this._valMaxLength;
        },
        set: function (value) {
            this._valMaxLength = value;
            this.updateValitators();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyInputComponent.prototype, "id", {
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    // set autoFocus ( value : boolean ) {
    //     if ( this.isTrue( value ) && this.el ) {
    //         let input = this.el.nativeElement.querySelector( 'input' );
    //         input.focus();
    //     }
    // }
    MyInputComponent.prototype.onEnterClick = function (event) {
        if (event.keyCode === 13) {
            this.onEnter.emit('enter');
        }
    };
    // private shrink () {
    //     if ( this.parentControl.value && this.parentControl.value.trim() !== '' ) {
    //         //this.el.nativeElement.className = '';
    //         this
    //             ._animation
    //             .setFromStyles( {
    //                 width : this.inputWidth + 'px'
    //             } )
    //             .setToStyles( {
    //                 width : this.el.nativeElement.children[ 0 ].children[ 2 ].offsetWidth + 5 + 'px'
    //             } )
    //             .setDelay( 1200 )
    //             .setDuration( 200 )
    //             .start( this.el.nativeElement );
    //     }
    // }
    MyInputComponent.prototype.trimValue = function () {
        var notUsabel;
        if (this.parentControl.value) {
            this.parentControl.updateValue(this.parentControl.value.trim());
            notUsabel = this.tolowerCase ? this.parentControl.updateValue(this.parentControl.value.toLowerCase()) : '';
            notUsabel = this.toupperCase ? this.parentControl.updateValue(this.parentControl.value.toUpperCase()) : '';
        }
        this.onBlur.emit('blured');
    };
    MyInputComponent.prototype.isTrue = function (value) {
        return lang_1.isPresent(value) && (value === true || value === 'true' || false);
    };
    // private initiateInputWidth () {
    //     let a = this
    //         ._animation
    //         .setFromStyles( {
    //             width : this.el.nativeElement.offsetWidth
    //         } )
    //         .setToStyles( {
    //             width : this.inputWidth + 'px'
    //         } )
    //         .setDelay( 0 )
    //         .setDuration( 700 )
    //         .start( this.el.nativeElement );
    //     a.onComplete( () => {
    //         //this.el.nativeElement.className = this.tempClassNames;
    //     } );
    // }
    MyInputComponent.prototype.onKeyupEvent = function ($event) {
        this.onEnterClick($event);
        this.onKeyup.emit($event);
    };
    MyInputComponent.prototype.updateValitators = function () {
        if (this.parentControl) {
            this.parentControl.validator = common_1.Validators.compose([
                RequiredValidator.requiredValidation(this._required),
                MinLengthValidator.minLengthValidation(this._valMinLength),
                MaxLengthValidator.maxLengthValidation(this._valMaxLength),
                PatterValidator.patternValidator(this.valPattern)
            ]);
            this.parentControl.updateValueAndValidity({ emitEvent: true, onlySelf: false });
        }
    };
    MyInputComponent = __decorate([
        core_1.Component({
            selector: 'my-input',
            template: "\n    <md-input-container\n        @toggleInputState='isInSummaryState'\n        [class.md-input-has-value]='parentControl.value'\n        [ngClass]='{\"md-input-has-placeholder\" : placeholder,\"summary\" : isInSummaryState , \"noPadding\": noPadding }'\n        flex-gt-sm='' >\n        <label\n         [ngClass]='{\"summary\" : isInSummaryState, \"noPadding\": noPadding} '\n        *ngIf='!isInSummaryState && showLabel!==\"false\"' [attr.for]='_id'>{{label}}</label><!--\n        --><input\n            (keyup)='onKeyupEvent($event)'\n            (blur)='trimValue()'\n            [class.summary-state]='isInSummaryState'\n            [disabled]='isInSummaryState'\n            class='md-input'\n            [attr.name]='_id'\n            [attr.id]='_id'\n            [attr.maxlength]='_valMaxLength'\n            [attr.minlength]='_valMinLength'\n            [attr.data-automation-id]='\"text_\" + _id'\n            [ngFormControl]='parentControl'\n            [attr.placeholder]='placeholder'/>\n            <span class='summary-text'>{{ parentControl.value }}</span>\n            <ng-content></ng-content>\n  </md-input-container>\n  ",
            styles: [require('./my-input.scss').toString()],
            inputs: [
                'id',
                'isInSummaryState',
                'label',
                'parentControl',
                'placeholder',
                'visibility',
                'valMaxLength',
                'valMinLength',
                'valPattern',
                'isRequired',
                'hostClassesRemove',
                'showLabel',
                'tolowerCase',
                'toupperCase',
                'autoFocus',
                'noPadding'
            ],
            directives: [input_1.MD_INPUT_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.Emulated,
            outputs: ['onEnter', 'onBlur', 'onKeyup'],
            animations: [
                // this here is our animation trigger that
                // will contain our state change animations.
                core_1.trigger('toggleInputState', [
                    // the styles defined for the `on` and `off`
                    // states declared below are persisted on the
                    // element once the animation completes.
                    core_1.state('true', core_1.style({ width: '385px' })),
                    core_1.state('false', core_1.style({ width: '405px' })),
                    // this here is our animation that kicks off when
                    // this state change jump is true
                    core_1.transition('expand <=> collapse', [
                        core_1.animate('200ms 1.2s ease-out')
                    ])
                ])
            ]
        })
    ], MyInputComponent);
    return MyInputComponent;
}());
exports.MyInputComponent = MyInputComponent;
var RequiredValidator = (function () {
    function RequiredValidator() {
    }
    RequiredValidator.requiredValidation = function (isRequired) {
        return function (c) {
            if (isRequired) {
                if (!c.value || c.value.length === 0) {
                    return {
                        required: true
                    };
                }
            }
            return null;
        };
    };
    return RequiredValidator;
}());
var MaxLengthValidator = (function () {
    function MaxLengthValidator() {
    }
    MaxLengthValidator.maxLengthValidation = function (valMaxLength) {
        return function (c) {
            if (valMaxLength) {
                if (!c.value || c.value.length <= valMaxLength) {
                    return null;
                }
                return {
                    mdMaxLength: true
                };
            }
            return null;
        };
    };
    return MaxLengthValidator;
}());
var MinLengthValidator = (function () {
    function MinLengthValidator() {
    }
    MinLengthValidator.minLengthValidation = function (valMinLength) {
        return function (c) {
            if (valMinLength) {
                if (!c.value || c.value.length >= valMinLength) {
                    return null;
                }
                return {
                    mdMinLength: true
                };
            }
            return null;
        };
    };
    return MinLengthValidator;
}());
var PatterValidator = (function () {
    function PatterValidator() {
    }
    PatterValidator.patternValidator = function (pattern) {
        return function (c) {
            if (pattern) {
                if (!c.value || new RegExp(pattern).test(c.value)) {
                    return null;
                }
                return {
                    mdPattern: true
                };
            }
            return null;
        };
    };
    return PatterValidator;
}());
