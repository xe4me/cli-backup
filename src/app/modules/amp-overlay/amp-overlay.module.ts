import { NgModule } from '@angular/core';
import { AmpOverlayComponent } from './components/amp-overlay/amp-overlay.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpOverlayComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpOverlayModule {
}
