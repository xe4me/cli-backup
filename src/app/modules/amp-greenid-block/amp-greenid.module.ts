import { NgModule } from '@angular/core';
import { AmpGreenIdServices } from '../../modules/amp-greenid-block/components/services/amp-greenid-service';
import { AmpGreenIdBlockComponent } from '../../modules/amp-greenid-block/components/amp-greenid-block';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';

const DECLARATIONS = [
    AmpGreenIdBlockComponent
];
@NgModule( {
    declarations : DECLARATIONS,
    imports : [
        AmpSharedRootModule, // @TODO : Why are we importing bellow modules if we're not using them?
        // AmpButtonModule ,
        // AmpCheckboxModule ,
        // AmpErrorModule ,
        FormsModule
    ],
    providers : [ AmpGreenIdServices, Http ],
    exports : DECLARATIONS
} )
export class AmpGreenIdModule {
}
