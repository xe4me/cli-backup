import { NgModule } from '@angular/core';
import { AmpErrorItemComponent , AmpErrorComponent } from './components/amp-error/amp-error.component';
import { AmpPipesModule } from '../amp-pipes';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpControlErrorComponent } from './components/amp-control-error/amp-control-error.component';
const DECLARATIONS = [ AmpControlErrorComponent , AmpErrorItemComponent , AmpErrorComponent ];
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
