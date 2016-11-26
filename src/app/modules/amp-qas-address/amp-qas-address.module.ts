import { NgModule } from '@angular/core';
import { AmpQasAddressService } from './services/amp-qas-address.service';
import { AmpQasAddressComponent } from './components/amp-qas-address/amp-qas-address.component';
import { AmpManualAddressComponent } from './components/amp-manual-address/amp-manual-address.component';
import { AmpManualAddressExtendedComponent } from './components/amp-manual-address-extended/amp-manual-address-extended.component';
import { AmpQasAddressMultiComponent } from './components/amp-qas-address-multi/amp-qas-address-multi.component';
import { AmpTypeaheadModule } from '../amp-typeahead/amp-typeahead.module';
import { AmpErrorModule } from '../amp-error/amp-error.module';
import { Http } from '@angular/http';
import { AmpInputsModule } from '../amp-inputs';
import { AmpDropdownModule } from '../amp-dropdown/amp-dropdown.module';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpButtonModule } from '../amp-button/amp-button.module';
import { AmpCheckboxModule } from '../amp-checkbox/amp-checkbox.module';
import { AmpFormModule } from '../amp-form/amp-form.module';
import { AmpGroupButtonsModule } from '../amp-group-buttons/amp-group-buttons.module';
const DECLARATIONS = [
    AmpQasAddressComponent ,
    AmpManualAddressExtendedComponent ,
    AmpQasAddressMultiComponent ,
    AmpManualAddressComponent
];
@NgModule( {
    declarations : [ ...DECLARATIONS ] ,
    imports      : [
        AmpFormModule ,
        AmpSharedRootModule ,
        AmpGroupButtonsModule ,
        AmpButtonModule ,
        AmpInputsModule ,
        AmpCheckboxModule ,
        AmpDropdownModule ,
        AmpErrorModule ,
        AmpTypeaheadModule
    ] ,
    providers    : [ AmpQasAddressService , Http ] ,
    exports      : DECLARATIONS
} )
export class AmpQasAddressModule {
}
