import { NgModule } from '@angular/core';
import { AmpRadioButtonGroupComponent } from './components/amp-radio-button-group/amp-radio-button-group.component';
import { AmpTooltipModule } from '../amp-tooltip/amp-tooltip.module';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpRadioButtonGroupComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule,
        AmpTooltipModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpRadioButtonGroupModule {
}
