import { NgModule } from '@angular/core';
import { AmpContactDetailsBlockComponent } from './components/amp-contact-details-block/amp-contact-details-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpTooltipModule } from '../amp-tooltip';

const DECLARATIONS = [ AmpContactDetailsBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule ,
        AmpFormModule ,
        AmpInputsModule ,
        AmpTooltipModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpContactDetailsBlockModule {
}
