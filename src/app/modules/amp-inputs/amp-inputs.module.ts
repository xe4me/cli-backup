import { NgModule } from '@angular/core';
import { AmpInputComponent } from './components/amp-input/amp-input.component';
import { AmpContactNumberComponent } from './components/amp-contact-number/amp-contact-number.component';
import { AmpEmailComponent } from './components/amp-email/amp-email.component';
import { AmpFirstNameComponent } from './components/amp-first-name/amp-first-name.component';
import { AmpHomeNumberComponent } from './components/amp-home-number/amp-home-number.component';
import { AmpLastNameComponent } from './components/amp-last-name/amp-last-name.component';
import { AmpPasswordComponent } from './components/amp-password/amp-password.component';
import { AmpMobileNumberComponent } from './components/amp-mobile-number/amp-mobile-number.component';
import { AmpWorkNumberComponent } from './components/amp-work-number/amp-work-number.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpErrorModule } from '../amp-error/amp-error.module';
import { AmpAccountNumberComponent } from './components/amp-account-number/amp-account-number.component';
import { AmpTaxFileNumberComponent } from './components/amp-tax-file-number/amp-tax-file-number.component';

const DECLARATIONS = [
    AmpInputComponent,
    AmpContactNumberComponent,
    AmpEmailComponent,
    AmpFirstNameComponent,
    AmpHomeNumberComponent,
    AmpLastNameComponent,
    AmpMobileNumberComponent,
    AmpPasswordComponent,
    AmpWorkNumberComponent,
    AmpAccountNumberComponent,
    AmpTaxFileNumberComponent
];
@NgModule( {
    declarations : DECLARATIONS,
    imports : [
        AmpSharedRootModule,
        AmpErrorModule
    ],
    exports : DECLARATIONS
} )
export class AmpInputsModule {
}
