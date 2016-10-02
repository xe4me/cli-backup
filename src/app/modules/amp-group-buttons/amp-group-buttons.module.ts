import { NgModule } from '@angular/core';
import { AmpGroupButtonsComponent } from './components/amp-group-buttons/amp-group-buttons.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpGroupButtonsComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpGroupButtonsModule {
}
