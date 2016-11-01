import { NgModule } from '@angular/core';
import { AmpSubmitReceiptComponent } from './components/amp-submit-receipt/amp-submit-receipt.component';
import { AmpLogoComponent } from '../amp-logo/components/amp-logo/amp-logo.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';

const DECLARATIONS = [ AmpSubmitReceiptComponent, AmpLogoComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports: [ AmpSharedRootModule ],
    exports: DECLARATIONS
} )
export class AmpSubmitReceiptModule {
}
