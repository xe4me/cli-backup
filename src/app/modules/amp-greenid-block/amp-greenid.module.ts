import { NgModule } from '@angular/core';
import { AmpGreenIdServices } from '../../modules/amp-greenid-block/components/services/amp-greenid-service';
import { AmpGreenidBlockComponent } from '../../modules/amp-greenid-block/components/amp-greenid-block';
import { FormControl, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { AmpErrorModule } from '../amp-error/amp-error.module';
import { Http } from '@angular/http';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpButtonModule } from '../amp-button/amp-button.module';
import { AmpCheckboxModule } from '../amp-checkbox/amp-checkbox.module';

const DECLARATIONS = [
    AmpGreenidBlockComponent
];
@NgModule( {
    declarations : [ ...DECLARATIONS ] ,
    imports      : [
        AmpSharedRootModule ,
        AmpButtonModule ,
        AmpCheckboxModule ,
        AmpErrorModule ,
        FormsModule
    ] ,
    providers    : [ AmpGreenIdServices , Http ] ,
    exports      : DECLARATIONS
} )
export class AmpGreenidModule {
}
