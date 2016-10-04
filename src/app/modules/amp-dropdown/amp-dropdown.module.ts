import { NgModule } from '@angular/core';
import { AmpDropdownComponent } from './components/amp-dropdown/amp-dropdown.component';
import { AmpStatesComponent } from './components/amp-states/amp-states.component';
import { AmpDirectivesModule } from '../amp-directives';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpDropdownComponent , AmpStatesComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpDirectivesModule ,
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpDropdownModule {
}
