import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { AmpGreenIdServices } from './services/amp-greenid-service';
import { AmpGreenIdBlockComponent } from './components/amp-greenid-block/amp-greenid-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpButtonModule } from '../amp-button/amp-button.module';
import { AmpFormModule } from '../amp-form/amp-form.module';
import { AmpCheckboxModule } from '../amp-checkbox/amp-checkbox.module';

const DECLARATIONS = [ AmpGreenIdBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS,
    imports : [
        AmpSharedRootModule,
        AmpButtonModule,
        AmpCheckboxModule,
        AmpFormModule
    ],
    providers : [ AmpGreenIdServices, Http ],
    exports : DECLARATIONS
} )
export class AmpGreenIdBlockModule {
}
