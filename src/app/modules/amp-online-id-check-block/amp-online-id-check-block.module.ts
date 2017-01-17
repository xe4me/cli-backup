import { NgModule } from '@angular/core';
import { AmpOnlineIdCheckBlockComponent } from './components/amp-online-id-check-block/amp-online-id-check-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpButtonModule } from '../amp-button';

const DECLARATIONS = [ AmpOnlineIdCheckBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule ,
        AmpFormModule ,
        AmpButtonModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpOnlineIdCheckBlockModule {
}
