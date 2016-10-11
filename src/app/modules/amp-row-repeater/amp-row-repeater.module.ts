import { NgModule } from '@angular/core';
import { AmpRowRepeaterComponent } from './components/amp-row-repeater/amp-row-repeater.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpButtonModule } from '../amp-button/amp-button.module';
const DECLARATIONS = [ AmpRowRepeaterComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule,
        AmpButtonModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpRowRepeaterModule {
}
