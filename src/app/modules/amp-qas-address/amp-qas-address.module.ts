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
import { AmpDropdownNewModule } from '../amp-dropdown-new/amp-dropdown.module';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpButtonModule } from '../amp-button/amp-button.module';
import { AmpCheckboxModule } from '../amp-checkbox/amp-checkbox.module';
import { AmpFormRowModule } from '../amp-form-row/amp-form-row.module';
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
        AmpFormRowModule ,
        AmpSharedRootModule ,
        AmpGroupButtonsModule ,
        AmpButtonModule ,
        AmpInputsModule ,
        AmpCheckboxModule ,
        AmpDropdownNewModule ,
        AmpErrorModule ,
        AmpTypeaheadModule
    ] ,
    providers    : [ Http ] ,
    exports      : DECLARATIONS
} )
export class AmpQasAddressModule {
}
