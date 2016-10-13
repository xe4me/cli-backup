import { NgModule } from '@angular/core';
import { AmpTooltipComponent } from './components/amp-tooltip/amp-tooltip.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpTooltipComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpTooltipModule {
}
