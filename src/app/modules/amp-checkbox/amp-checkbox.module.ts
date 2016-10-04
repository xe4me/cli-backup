import { NgModule } from '@angular/core';
import { AmpCheckboxComponent } from './components/amp-checkbox/amp-checkbox.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpCheckboxComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpCheckboxModule {
}
