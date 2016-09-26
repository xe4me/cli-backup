import { NgModule } from '@angular/core';
import { ClickedOutsideDirective } from "../../directives/clicked-outside/clicked-outside.directive";
import { AutoFocusDirective } from "../../directives/auto-focus/auto-focus.directive";
import { FocuserDirective } from "../../directives/focuser/focuser.directive";
const DECLARATIONS = [
    ClickedOutsideDirective ,
    AutoFocusDirective ,
    FocuserDirective
];
@NgModule( {
    declarations : DECLARATIONS ,
    exports      : DECLARATIONS
} )
export class AmpDirectivesModule {
}
