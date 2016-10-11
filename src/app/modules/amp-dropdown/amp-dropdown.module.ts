import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { AmpDropdownComponent } from './components/amp-dropdown/amp-dropdown.component';
import { AmpStatesComponent } from './components/amp-states/amp-states.component';
import { AmpCountryComponent } from './components/amp-country/amp-country.component';
import { AmpDirectivesModule } from '../amp-directives';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpCountryService } from './services/amp-country.service';
const DECLARATIONS = [ AmpDropdownComponent , AmpStatesComponent , AmpCountryComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpDirectivesModule ,
        AmpSharedRootModule
    ] ,
    providers    : [ AmpCountryService , Http ] ,
    exports      : DECLARATIONS
} )
export class AmpDropdownModule {
}
