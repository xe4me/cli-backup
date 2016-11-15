import { NgModule } from '@angular/core';
import { AmpReCaptchaComponent } from './components/amp-recaptcha.component';
import { AmpReCaptchaService } from './services/amp-recaptcha.service';

@NgModule({
    declarations: [AmpReCaptchaComponent],
    exports: [AmpReCaptchaComponent],
    providers: [AmpReCaptchaService]
})
export class AmpGoogleRecaptchaModule {}
