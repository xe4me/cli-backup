import { NgModule } from '@angular/core';
import { AmpSmsService } from './services/amp-sms.service';
import { SaveAndCloseService } from '../../services';
import { AmpSmsBlockComponent } from './components/amp-sms-block/amp-sms-block.component';
import { AmpSaveCloseButtonComponent } from './components/amp-save-close-button/amp-save-close-button.component';
import { AmpSaveConfirmationBlockComponent } from './components/amp-save-confirmation-block/amp-save-confirmation-block.component';
import { AmpExitButtonComponent } from './components/amp-exit-button/amp-exit-button.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpButtonModule } from '../amp-button';
import { AmpCheckboxModule } from '../amp-checkbox';

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
        SaveAndCloseService ,
        AmpSmsService
    ],
    entryComponents : DECLARATIONS ,
    exports      : DECLARATIONS
} )

export class AmpSaveCloseBlockModule {

}
