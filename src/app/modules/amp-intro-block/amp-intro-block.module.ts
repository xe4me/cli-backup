import { NgModule } from '@angular/core';
import { AmpIntroBlockComponent } from './components/amp-intro-block/amp-intro-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpIntroBlockComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpIntroBlockModule {
}
