import { NgModule } from '@angular/core';
import { AmpButton } from './components/amp-button/amp-button.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpButton ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpButtonModule {
}
