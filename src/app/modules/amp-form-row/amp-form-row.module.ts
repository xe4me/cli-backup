import { NgModule } from '@angular/core';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormRowComponent } from './components/amp-form-row/amp-form-row.component';
const DECLARATIONS = [ AmpFormRowComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpFormRowModule {
}
