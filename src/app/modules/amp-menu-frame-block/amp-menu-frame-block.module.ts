import { NgModule } from '@angular/core';
import { AmpMenuFrameBlockComponent } from './components/amp-menu-frame-block/amp-menu-frame-block.component';
import { AmpStandAloneMenuModule } from '../amp-standalone-menu';
import { AmpFormModule } from '../amp-form';
import { AmpButtonModule } from '../amp-button';

const DECLARATIONS = [ AmpMenuFrameBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS,
    imports      : [
        AmpFormModule,
        AmpButtonModule,
        AmpStandAloneMenuModule
    ],
    entryComponents : DECLARATIONS,
    exports      : DECLARATIONS
} )
export class AmpMenuFrameBlockModule {
}
