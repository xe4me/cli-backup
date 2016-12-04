import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { AmpDropdownComponent } from './components/amp-dropdown/amp-dropdown.component';
import { AmpStatesComponent } from './components/amp-states/amp-states.component';
import { AmpStreetTypesComponent } from './components/amp-street-types/amp-street-types.component';
import { AmpCountryComponent } from './components/amp-country/amp-country.component';
import { AmpTitlesComponent } from './components/amp-titles/amp-titles.component';
import { AmpDirectivesModule } from '../amp-directives';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpCountryService } from './services/amp-country.service';
import { AmpInputsModule } from '../amp-inputs/amp-inputs.module';
import { AmpErrorModule } from '../amp-error/amp-error.module';
const DECLARATIONS = [
    AmpTitlesComponent ,
    AmpStreetTypesComponent ,
    AmpDropdownComponent ,
    AmpStatesComponent ,
    AmpCountryComponent
];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpErrorModule ,
        AmpInputsModule ,
        AmpDirectivesModule ,
        AmpSharedRootModule
    ] ,
    providers    : [ AmpCountryService , Http ] ,
    exports      : DECLARATIONS
} )
export class AmpDropdownNewModule {
}
