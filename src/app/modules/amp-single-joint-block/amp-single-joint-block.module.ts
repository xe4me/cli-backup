import { NgModule } from '@angular/core';
import { AmpApplicantGeneratorService } from './services/amp-applicant-generator.service';
import { AmpSingleJointBlockComponent } from './components/amp-single-joint-block/amp-single-joint-block.component';

import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpGroupButtonsModule } from '../amp-group-buttons';
import { AmpFormModule } from '../amp-form';

const DECLARATIONS = [
    AmpSingleJointBlockComponent
];

@NgModule( {
    declarations    : DECLARATIONS,
    imports         : [
        AmpSharedRootModule,
        AmpGroupButtonsModule,
        AmpFormModule
    ],
    providers       : [
        AmpApplicantGeneratorService,
    ],
    entryComponents : DECLARATIONS,
    exports         : DECLARATIONS
} )

export class AmpSingleJointBlockModule {

}
