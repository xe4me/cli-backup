import { NgModule } from '@angular/core';
import { AmpRadioButtonGroupComponent } from './components/amp-radio-button-group/amp-radio-button-group.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpRadioButtonGroupComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpRadioButtonGroupModule {
}
