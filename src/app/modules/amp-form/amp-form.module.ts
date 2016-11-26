import { NgModule } from '@angular/core';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormRowComponent } from './components/amp-form-row/amp-form-row.component';
import { AmpFormBlockComponent } from './components/amp-form-block/amp-form-block.component';
import { AmpButtonModule } from '../amp-button/amp-button.module';
import { AmpErrorModule } from '../amp-error/amp-error.module';
import { AmpOverlayModule } from '../amp-overlay/amp-overlay.module';
const DECLARATIONS = [ AmpFormBlockComponent, AmpFormRowComponent ];
@NgModule( {
    declarations : DECLARATIONS,
    imports : [
        AmpOverlayModule,
        AmpErrorModule,
        AmpButtonModule,
        AmpSharedRootModule
    ],
    exports : DECLARATIONS
} )
export class AmpFormModule {
}
