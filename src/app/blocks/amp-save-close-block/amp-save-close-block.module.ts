import { NgModule } from '@angular/core';
import { AmpSmsService } from './services/amp-sms.service';
import { SaveAndCloseService } from '../../services';
import { AmpSmsBlockComponent } from './components/amp-sms-block/amp-sms-block.component';
import { AmpSaveCloseButtonComponent } from './components/amp-save-close-button/amp-save-close-button.component';
import { AmpSaveConfirmationBlockComponent } from './components/amp-save-confirmaiton-block/amp-save-confirmation-block.component';
import { AmpExitButtonComponent } from './components/amp-exit-button/amp-exit-button.component';
import { AmpSharedRootModule } from '../../modules/amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../../modules/amp-form';
import { AmpInputsModule } from '../../modules/amp-inputs';
import { AmpButtonModule } from '../../modules/amp-button';
import { AmpCheckboxModule } from '../../modules/amp-checkbox';

const DECLARATIONS = [
    AmpSmsBlockComponent,
    AmpSaveConfirmationBlockComponent,
    AmpSaveCloseButtonComponent,
    AmpExitButtonComponent
];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule ,
        AmpFormModule ,
        AmpButtonModule ,
        AmpCheckboxModule ,
        AmpInputsModule
    ] ,
    providers : [
        SaveAndCloseService,
        AmpSmsService
    ],
    entryComponents : DECLARATIONS,
    exports      : DECLARATIONS
} )

export class AmpSaveCloseBlockModule {

}
