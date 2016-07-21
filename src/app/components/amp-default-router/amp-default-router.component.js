"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AmpDefaultRouterComponent = (function () {
    function AmpDefaultRouterComponent(router) {
        this.router = router;
    }
    /* TODO ;
     We're redirecting every request to BuyBackFormComponent currently , but this should be decided
     whether we want it to consume different applications or not ?
     * */
    AmpDefaultRouterComponent.prototype.ngOnInit = function () {
        // Initially we're redirecting the request to the / (which is generally the details page)
        this.router.navigate(['BuyBackFormComponent', { id: '' }]);
        return undefined;
    };
    AmpDefaultRouterComponent = __decorate([
        core_1.Component({
            selector: 'default-router',
            template: ""
        })
    ], AmpDefaultRouterComponent);
    return AmpDefaultRouterComponent;
}());
exports.AmpDefaultRouterComponent = AmpDefaultRouterComponent;
