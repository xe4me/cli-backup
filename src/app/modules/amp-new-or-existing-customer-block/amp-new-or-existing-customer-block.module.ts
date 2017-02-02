import { NgModule } from '@angular/core';
import { AmpNewOrExistingCustomerBlockComponent } from './components/amp-new-or-existing-customer-block/amp-new-or-existing-customer-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpSliderModule } from '../amp-slider/amp-slider.module';
import { AmpFormModule } from '../amp-form';
import { AmpGroupButtonsModule } from '../amp-group-buttons/amp-group-buttons.module';

const DECLARATIONS = [ AmpNewOrExistingCustomerBlockComponent ];

@NgModule( {
    declarations    : DECLARATIONS,
    imports         : [
        AmpSharedRootModule,
        AmpSliderModule,
        AmpGroupButtonsModule,
        AmpFormModule
    ],
    entryComponents : DECLARATIONS,
    exports         : DECLARATIONS
} )
export class AmpNewOrExistingCustomerBlockModule {
}
