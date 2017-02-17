import { NgModule } from '@angular/core';
import { AmpBasicInfoBlockComponent } from './components/amp-basic-info-block/amp-basic-info-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpDropdownModule } from '../amp-dropdown';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import {
    CustomerDetailsService,
    GreenIdStatusService,
    LoginStatusService
} from '../../services';
import { PrepopAmpBasicInfoService } from './services/prepop-amp-basic-info.service';

const DECLARATIONS = [ AmpBasicInfoBlockComponent ];

@NgModule( {
    declarations    : DECLARATIONS,
    entryComponents : DECLARATIONS,
    imports         : [
        AmpSharedRootModule,
        AmpDropdownModule,
        AmpFormModule,
        AmpInputsModule
    ],
    providers : [
        CustomerDetailsService,
        GreenIdStatusService,
        LoginStatusService,
        PrepopAmpBasicInfoService
    ],
    exports         : DECLARATIONS
} )
export class AmpBasicInfoBlockModule {
}
