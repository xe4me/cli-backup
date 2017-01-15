import { NgModule } from '@angular/core';
import { AmpTaxFileNumberBlockComponent } from './components/amp-tax-file-number-block/amp-tax-file-number-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpTooltipModule } from '../amp-tooltip';
import { AmpDropdownModule } from '../amp-dropdown';
import { AmpGroupButtonsModule } from '../amp-group-buttons';

const DECLARATIONS = [ AmpTaxFileNumberBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule ,
        AmpFormModule ,
        AmpInputsModule ,
        AmpTooltipModule,
        AmpDropdownModule,
        AmpGroupButtonsModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpTaxFileNumberBlockModule {
}
