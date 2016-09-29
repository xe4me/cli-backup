"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/map');
require('rxjs/add/operator/distinctUntilChanged');
var core_1 = require('@angular/core');
var AmpReduxComponent = (function () {
    function AmpReduxComponent(store, _modelActions) {
        this.store = store;
        this._modelActions = _modelActions;
        this.debounceTime = 300;
        this.fdn = [];
    }
    AmpReduxComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.ampReduxRef) {
            var childFormControl = this.ampReduxRef.control;
            if (childFormControl) {
                childFormControl
                    .valueChanges
                    .debounceTime(this.debounceTime)
                    .distinctUntilChanged()
                    .subscribe(function (query) {
                    _this.dispatch(query, _this.fdn);
                });
            }
        }
    };
    AmpReduxComponent.prototype.dispatch = function (query, fdn) {
        var payload = {
            query: query,
            fdn: fdn
        };
        this.store.dispatch(this._modelActions.update(payload));
    };
    __decorate([
        core_1.Input('debounce-time')
    ], AmpReduxComponent.prototype, "debounceTime");
    __decorate([
        core_1.Input('fdn')
    ], AmpReduxComponent.prototype, "fdn");
    __decorate([
        core_1.ContentChild('ampReduxRef')
    ], AmpReduxComponent.prototype, "ampReduxRef");
    AmpReduxComponent = __decorate([
        core_1.Component({
            selector: 'amp-redux',
            template: "<ng-content></ng-content>"
        })
    ], AmpReduxComponent);
    return AmpReduxComponent;
}());
exports.AmpReduxComponent = AmpReduxComponent;
