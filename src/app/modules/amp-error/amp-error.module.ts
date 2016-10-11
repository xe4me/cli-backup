import { NgModule } from '@angular/core';
import { AmpErrorItemComponent , AmpErrorComponent } from './components/amp-error/amp-error.component';
import { AmpPipesModule } from '../amp-pipes';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpErrorItemComponent , AmpErrorComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpPipesModule ,
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpErrorModule {
}
