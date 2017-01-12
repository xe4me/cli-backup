import { NgModule } from '@angular/core';
import { AmpWelcomeBlockComponent } from './components/amp-welcome-block/amp-welcome-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpButtonModule } from '../amp-button';

const DECLARATIONS = [ AmpWelcomeBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule ,
        AmpFormModule,
        AmpButtonModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpWelcomeBlockModule {
}
