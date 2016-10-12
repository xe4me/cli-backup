import { NgModule } from '@angular/core';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';
import { AutoFocusDirective } from './directives/auto-focus/auto-focus.directive';
import { AutoFocusOnDirective } from './directives/auto-focus-on/auto-focus-on.directive';
import { ThemeIDDirective } from './directives/theme-id/themeId.directive';
import { AmpStickyOnScrollDirective } from './directives/auto-sticky-on-scroll/amp-sticky-on-scroll.directive';
import { FocuserDirective } from './directives/focuser/focuser.directive';
import { AmpNumberDirective } from './directives/number/amp-number.directive';
const DECLARATIONS = [
    AutoFocusOnDirective ,
    ClickedOutsideDirective ,
    AutoFocusDirective ,
    ThemeIDDirective ,
    AmpStickyOnScrollDirective ,
    FocuserDirective ,
    AmpNumberDirective
];
@NgModule( {
    declarations : DECLARATIONS ,
    exports      : DECLARATIONS
} )
export class AmpDirectivesModule {
}
