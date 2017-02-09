import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { AmpHttpService } from  '../../services/amp-http/amp-http.service';
import { CustomerDetailsService } from '../../services/customer-details/customer-details.service';
import { LoginStatusService } from '../../services/login/login-status.service';
import { PrepopAmpContactDetailsService } from './services/prepop-amp-contact-details.service';
import { AmpContactDetailsBlockComponent } from './components/amp-contact-details-block/amp-contact-details-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpTooltipModule } from '../amp-tooltip';

const DECLARATIONS = [ AmpContactDetailsBlockComponent ];

@NgModule( {
    declarations    : DECLARATIONS,
    entryComponents : DECLARATIONS,
    imports         : [
        AmpSharedRootModule,
        AmpFormModule,
        AmpInputsModule,
        AmpTooltipModule
    ],
    providers : [
        CustomerDetailsService,
        LoginStatusService,
        AmpHttpService,
        Http,
        PrepopAmpContactDetailsService
    ],
    exports         : DECLARATIONS
} )
export class AmpContactDetailsBlockModule {
}
