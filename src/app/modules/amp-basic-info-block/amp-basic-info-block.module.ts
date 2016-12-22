import { NgModule } from '@angular/core';
import { AmpBasicInfoBlockComponent } from './components/amp-basic-info-block/amp-basic-info-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpDropdownModule } from '../amp-dropdown';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';

const DECLARATIONS = [ AmpBasicInfoBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule,
        AmpDropdownModule ,
        AmpFormModule ,
        AmpInputsModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpBasicInfoBlockModule {
}
