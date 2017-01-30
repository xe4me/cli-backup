import { NgModule } from '@angular/core';
import { AmpNewOrExistingCustomerBlockComponent } from './components/amp-new-or-existing-customer-block/amp-new-or-existing-customer-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpButtonModule } from '../amp-button/amp-button.module';

const DECLARATIONS = [ AmpNewOrExistingCustomerBlockComponent ];

@NgModule( {
    declarations: DECLARATIONS,
    imports: [
        AmpButtonModule,
        AmpSharedRootModule,
        AmpFormModule,
        AmpInputsModule
    ],
    entryComponents: DECLARATIONS,
    exports: DECLARATIONS
} )
export class AmpNewOrExistingCustomerBlockModule {
}
