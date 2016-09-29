"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var amp_button_component_1 = require('../../../app/components/amp-button/amp-button.component');
var AmpIntroBlockComponent = (function () {
    function AmpIntroBlockComponent() {
        this.slideUp = 'expanded';
    }
    /**
     * Call this method to move onto the next block
     *
     * In order to call this in your form you need to import the context of this component into your class, for a sample of how to do this, see the styleguide implementation of the amp-intro-block.
     *
     *
     */
    AmpIntroBlockComponent.prototype.proceed = function () {
        this.slideUp = 'collapsed';
    };
    AmpIntroBlockComponent = __decorate([
        core_1.Component({
            selector: 'amp-intro-block',
            directives: [amp_button_component_1.AmpButton],
            host: {
                '[@slideUp]': 'slideUp'
            },
            template: "\n            <div class='{{ selectorName }} ph+ tablet-and-down-ph' id='{{ selectorName }}' [class.hidden]='!isActive'>\n                <div class='grid__container 1/1 palm-1/1'>\n                    <div class='grid__item_floated utils__align&#45;&#45;left' >\n                                <ng-content></ng-content>\n                    </div>\n                </div>\n            </div>\n    ",
            styles: [require('./amp-intro-block.component.scss').toString()],
            animations: [
                core_1.trigger('slideUp', [
                    core_1.state('collapsed, void', core_1.style({ height: '0px', opacity: '0', display: 'none', padding: 0 })),
                    core_1.state('expanded', core_1.style({ height: '*', opacity: '1', overflow: 'hidden', display: 'block' })),
                    core_1.transition('collapsed <=> expanded', [core_1.animate(800)])
                ])
            ]
        })
    ], AmpIntroBlockComponent);
    return AmpIntroBlockComponent;
}());
exports.AmpIntroBlockComponent = AmpIntroBlockComponent;
