import { NgModule } from '@angular/core';
import { AmpContinueBlockComponent } from './components/amp-continue-block/amp-continue-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpButtonModule } from '../amp-button';

const DECLARATIONS = [ AmpContinueBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS,
    imports      : [
        AmpSharedRootModule,
        AmpFormModule,
        AmpInputsModule,
        AmpButtonModule
    ],
    entryComponents : DECLARATIONS,
    exports      : DECLARATIONS
} )
export class AmpRetrieveBlockModule {
}
