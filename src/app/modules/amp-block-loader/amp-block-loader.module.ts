import { NgModule } from '@angular/core';
import { AmpAddressMultiBlockComponent } from './components/amp-address-multi-block/amp-address-multi-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpBlockLoaderDirective } from '../../amp-block-loader.directive';
const DECLARATIONS = [ AmpBlockLoaderDirective ];

@NgModule( {
    declarations    : DECLARATIONS,
    imports         : [
        AmpSharedRootModule
    ],
    exports         : DECLARATIONS
} )
export class AmpBlockLoaderModule {
}
