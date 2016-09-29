"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var amp_utils_1 = require('./modules/amp-utils');
var FormBlock = (function () {
    function FormBlock(formModelService, elementRef, _cd, progressObserver, scrollService) {
        this.formModelService = formModelService;
        this.elementRef = elementRef;
        this._cd = _cd;
        this.progressObserver = progressObserver;
        this.scrollService = scrollService;
        this.isInSummaryState = false;
        this.isActive = false;
        this.hasClickedOnOkButton = false;
        this.selectorName = 'default-form-block-selector-name';
        this.visibleFlag = 'defaultIsVisible';
        this.doneFlag = 'defaultIsDone';
        this.noScroll = false;
    }
    FormBlock.prototype.context = function () {
        return this;
    };
    FormBlock.prototype.ngAfterViewInit = function () {
        this.selectorName = amp_utils_1.arrayJoinByDash(this.__fdn) + '-block';
        this.visibleFlag = this.selectorName + 'IsVisible';
        this.doneFlag = this.selectorName + 'IsDone';
        this.subscribeToScrollEvents();
        this._cd.markForCheck();
    };
    FormBlock.prototype.ngOnDestroy = function () {
        this.unSubscribeFromScrollEvents();
    };
    FormBlock.prototype.updateSelectorName = function (_customString) {
        this.selectorName += '-' + _customString;
    };
    FormBlock.prototype.autoFocus = function () {
        var _this = this;
        /*
         * TODO : This should be a directive or something else.
         * */
        setTimeout(function () {
            var inputs = _this.elementRef.nativeElement.getElementsByTagName('input');
            if (!inputs) {
                inputs = _this.elementRef.nativeElement.getElementsByTagName('textarea');
                if (!inputs) {
                }
                else {
                    inputs = _this.elementRef.nativeElement.getElementsByTagName('select');
                }
            }
            if (inputs && inputs.length > 0) {
                inputs[0].focus();
            }
        }, 100);
    };
    FormBlock.prototype.onEdit = function () {
        this.isInSummaryState = false;
    };
    FormBlock.prototype.onNext = function () {
        var _this = this;
        if (this.canGoNext) {
            this.scrollService.scrollToNextUndoneBlock(this.__form);
            this.progressObserver.onProgress(this.__fdn);
            setTimeout(function () {
                _this.isInSummaryState = true;
                _this._cd.markForCheck();
            }, 1200);
        }
    };
    Object.defineProperty(FormBlock.prototype, "canGoNext", {
        get: function () {
            return this.__controlGroup.valid;
        },
        enumerable: true,
        configurable: true
    });
    FormBlock.prototype.subscribeToScrollEvents = function () {
        var _this = this;
        if (!this.noScroll) {
            this.scrollSubscription = this.scrollService.$scrolled.subscribe(function (changes) {
                if (changes === _this.selectorName) {
                    _this.isInSummaryState = false;
                    _this.isActive = true;
                    _this.autoFocus();
                    _this._cd.markForCheck();
                }
            });
        }
    };
    FormBlock.prototype.resetBlock = function () {
        this.isInSummaryState = false;
    };
    FormBlock.prototype.unSubscribeFromScrollEvents = function () {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    };
    __decorate([
        core_1.ViewChild('focusZone')
    ], FormBlock.prototype, "focusZone");
    return FormBlock;
}());
exports.FormBlock = FormBlock;
