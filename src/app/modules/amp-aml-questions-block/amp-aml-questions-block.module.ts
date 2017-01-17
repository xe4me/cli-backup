import { NgModule } from '@angular/core';
import { AmpAmlQuestionsBlockComponent } from './components/amp-aml-questions-block/amp-aml-questions-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpDropdownModule } from '../amp-dropdown';

const DECLARATIONS = [ AmpAmlQuestionsBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpDropdownModule,
        AmpFormModule,
        AmpInputsModule,
        AmpSharedRootModule
    ],
    exports      : DECLARATIONS
} )
export class AmpAmlQuestionsBlockModule {
}
