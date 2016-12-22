import { NgModule } from '@angular/core';
import { AmpGreenIdServices } from '../../modules/amp-greenid-block/components/services/amp-greenid-service';
import { AmpGreenIdBlockComponent } from '../../modules/amp-greenid-block/components/amp-greenid-block';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpButtonModule } from '../amp-button/amp-button.module';
import { AmpFormModule } from '../amp-form/amp-form.module';
import { AmpCheckboxModule } from '../amp-checkbox/amp-checkbox.module';

const DECLARATIONS = [
    AmpGreenIdBlockComponent
];
@NgModule( {
    declarations : DECLARATIONS,
    imports : [
        AmpSharedRootModule,
        AmpButtonModule,
        AmpCheckboxModule,
        AmpFormModule,
        FormsModule
    ],
    providers : [ AmpGreenIdServices, Http ],
    exports : DECLARATIONS
} )
export class AmpGreenIdModule {
}
