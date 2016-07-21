"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var my_md_input_component_ts_1 = require('../../components/my-md-input/my-md-input.component.ts');
var core_2 = require('@angular/core');
var InputWithLabelGroupComponent = (function () {
    function InputWithLabelGroupComponent() {
        this.valMaxDate = '1000000';
        this.valMinDate = '-1000000';
        this.width = '1/3';
        this.tolowerCase = false;
        this.toupperCase = false;
        this.onEnter = new core_2.EventEmitter();
        this.onBlur = new core_2.EventEmitter();
        this.onKeyup = new core_2.EventEmitter();
    }
    InputWithLabelGroupComponent = __decorate([
        core_1.Component({
            selector: 'input-with-label-group',
            template: "\n        <div class='input-with-label-group'>\n            <label class='heading heading-contxtual-label palm-hide' *ngIf='contxtualLabel' >{{contxtualLabel}}\n            </label><!--\n            -->&nbsp;<!--\n            --><my-md-input\n                (onEnter)='onEnter.emit(\"enter\")'\n                (onBlur)='onBlur.emit(\"blured\")'\n                (onKeyup)='onKeyup.emit($event)'\n                [class]='width'\n                [isInSummaryState]='isInSummaryState'\n                [tolowerCase]='tolowerCase'\n                [toupperCase]='toupperCase'\n                [id]='id'\n                [label]='label'\n                [placeholder]='placeholder'\n                [showLabel]='showLabel'\n                [parentControl]='parentControl'\n                [isRequired]='isRequired'\n                [valPattern]='valPattern'\n                [valMaxLength]='valMaxLength'\n                [valMinLength]='valMinLength'\n                [valMinDate]='valMinDate'\n                [valMaxDate]='valMaxDate'>\n            </my-md-input>\n        </div>\n        ",
            inputs: [
                'id',
                'isInSummaryState',
                'label',
                'parentControl',
                'isRequired',
                'valPattern',
                'valMaxLength',
                'valMaxDate',
                'valMinDate',
                'valMinLength',
                'contxtualLabel',
                'showLabel',
                'tolowerCase',
                'toupperCase',
                'width',
                'placeholder'
            ],
            directives: [my_md_input_component_ts_1.MdInputComponent],
            styles: [require('./input-with-label-group.scss').toString()],
            outputs: ['onEnter', 'onBlur', 'onKeyup']
        })
    ], InputWithLabelGroupComponent);
    return InputWithLabelGroupComponent;
}());
exports.InputWithLabelGroupComponent = InputWithLabelGroupComponent;
