import { NgModule } from '@angular/core';
import { AmpMenuFrameBlockComponent } from './components/amp-menu-frame-block/amp-menu-frame-block.component';
import { AmpFormModule } from '../amp-form';
import { AmpButtonModule } from '../amp-button';

const DECLARATIONS = [ AmpMenuFrameBlockModule ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpFormModule,
        AmpButtonModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpMenuFrameBlockModule {
}
