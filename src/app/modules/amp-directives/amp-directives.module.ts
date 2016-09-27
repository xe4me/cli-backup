import { NgModule } from '@angular/core';
import { ThemeIDDirective } from './theme-id/themeId.directive';
import { ClickedOutsideDirective } from './clicked-outside/clicked-outside.directive';
import { AutoFocusDirective } from './auto-focus/auto-focus.directive';
import { FocuserDirective } from './focuser/focuser.directive';
import { AmpStickyOnScrollDirective } from './auto-sticky-on-scroll/amp-sticky-on-scroll.directive';
const DECLARATIONS = [
    ClickedOutsideDirective ,
    AutoFocusDirective ,
    ThemeIDDirective ,
    AmpStickyOnScrollDirective ,
    FocuserDirective
];
@NgModule( {
    declarations : DECLARATIONS ,
    exports      : DECLARATIONS
} )
export class AmpDirectivesModule {
}
