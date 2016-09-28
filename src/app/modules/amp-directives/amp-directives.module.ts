import { NgModule } from '@angular/core';
import {
    ThemeIDDirective ,
    ClickedOutsideDirective ,
    AutoFocusDirective ,
    FocuserDirective ,
    AmpStickyOnScrollDirective
} from './index';
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
