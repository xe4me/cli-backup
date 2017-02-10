import { NgModule } from '@angular/core';
import { AmpContinueBlockComponent } from './components/amp-continue-block/amp-continue-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpButtonModule } from '../amp-button';
import { AmpDirectivesModule } from '../amp-directives';
import {
    ScrollService,
    SaveService,
    FormModelService
} from '../../services';
import { RetrieveService } from '../../services/retrieve/retrieve.service';
import { AmpSliderModule } from '../amp-slider/amp-slider.module';

const DECLARATIONS = [ AmpContinueBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS,
    imports      : [
        AmpSharedRootModule,
        AmpFormModule,
        AmpSliderModule,
        AmpInputsModule,
        AmpButtonModule,
        AmpDirectivesModule
    ],
    providers    : [
        ScrollService,
        SaveService,
        FormModelService,
        RetrieveService,
    ],
    entryComponents : DECLARATIONS,
    exports      : DECLARATIONS
} )
export class AmpRetrieveBlockModule {
}
