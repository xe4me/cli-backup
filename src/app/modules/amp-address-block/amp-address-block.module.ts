import { NgModule } from '@angular/core';
import { AmpAddressMultiBlockComponent } from './components/amp-address-multi-block/amp-address-multi-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpTooltipModule } from '../amp-tooltip';
import { AmpQasAddressModule } from '../amp-qas-address';

const DECLARATIONS = [ AmpAddressMultiBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule ,
        AmpFormModule ,
        AmpInputsModule ,
        AmpTooltipModule ,
        AmpQasAddressModule
    ] ,
    entryComponents : DECLARATIONS,
    exports      : DECLARATIONS
} )
export class AmpAddressBlockModule {
}
