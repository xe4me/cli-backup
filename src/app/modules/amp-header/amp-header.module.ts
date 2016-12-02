import { NgModule } from '@angular/core';
import { AmpHeaderComponent } from './components/amp-header/amp-header.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { DeviceService } from '../../services/device/device.service';
import { AmpLogoModule } from '../amp-logo';
import { AmpPopDownModule } from '../amp-pop-down';
import { AmpButtonModule } from '../amp-button';

const DECLARATIONS = [ AmpHeaderComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule,
        AmpPopDownModule,
        AmpLogoModule,
        AmpButtonModule
    ] ,
    providers     : [
        DeviceService
    ] ,
    exports      : DECLARATIONS
} )
export class AmpHeaderModule {
}
