import { NgModule } from '@angular/core';
import { AmpHeaderComponent } from './components/amp-header/amp-header.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { DeviceService } from '../../services/device/device.service';
import { AmpLogoModule } from '../amp-logo';
import { AmpPopDownModule } from '../amp-pop-down';

const DECLARATIONS = [ AmpHeaderComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule,
        AmpPopDownModule,
        AmpLogoModule,
    ] ,
    providers     : [
        DeviceService
    ] ,
    exports      : DECLARATIONS
} )
export class AmpHeaderModule {
}
