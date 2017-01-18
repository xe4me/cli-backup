import { NgModule } from '@angular/core';
import { AmpCaptchaBlockComponent } from './components/amp-captcha-block/amp-captcha-block.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpFormModule } from '../amp-form';
import { AmpInputsModule } from '../amp-inputs';
import { AmpGoogleRecaptchaModule } from '../amp-google-recaptcha';

const DECLARATIONS = [ AmpCaptchaBlockComponent ];

@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule,
        AmpFormModule,
        AmpInputsModule,
        AmpGoogleRecaptchaModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpCaptchaBlockModule {
}
