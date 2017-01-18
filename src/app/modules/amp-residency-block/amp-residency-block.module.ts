import { NgModule } from '@angular/core';
import { AmpResidencyBlockComponent } from './components/amp-residency-block/amp-residency-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpDropdownModule } from '../amp-dropdown';
import { AmpFormModule } from '../amp-form';
import { AmpGroupButtonsModule } from '../amp-group-buttons';
import { AmpInputsModule } from '../amp-inputs';
import { AmpTooltipModule } from '../amp-tooltip';

const DECLARATIONS = [ AmpResidencyBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS,
    imports      : [
        AmpSharedRootModule,
        AmpDropdownModule,
        AmpFormModule,
        AmpGroupButtonsModule,
        AmpInputsModule,
        AmpTooltipModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpResidencyBlockModule {
}
