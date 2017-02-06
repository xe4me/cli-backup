import { NgModule } from '@angular/core';
import { AmpLoginBlockComponent } from './components/amp-login-block/amp-login-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpButtonModule } from '../amp-button';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { LoginStatusService } from '../../services/login/login-status.service';

const DECLARATIONS = [ AmpLoginBlockComponent ];

@NgModule( {
    declarations: DECLARATIONS,
    entryComponents: DECLARATIONS,
    imports: [
        AmpSharedRootModule,
        AmpFormModule,
        AmpInputsModule,
        AmpButtonModule
    ],
    exports: DECLARATIONS,
    providers: [LoginStatusService]
} )

export class AmpLoginBlockModule {
}
