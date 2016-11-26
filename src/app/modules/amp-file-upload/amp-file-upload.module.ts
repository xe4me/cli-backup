import { NgModule } from '@angular/core';
import { AmpFileUploadService } from './services/amp-file-upload.service';
import { AmpFileUploadComponent } from './components/amp-file-upload.component';
import { Http } from '@angular/http';
import { AmpButtonModule } from '../amp-button';
import { AmpProgressBarsModule } from '../amp-progress-bars/amp-progress-bars.module';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';

const DECLARATIONS = [
    AmpFileUploadComponent
];
@NgModule( {
    declarations : DECLARATIONS,
    imports : [
        AmpProgressBarsModule,
        AmpSharedRootModule,
        AmpButtonModule
    ],
    providers : [ AmpFileUploadService, Http ],
    exports : DECLARATIONS
} )
export class AmpFileUploadModule {
}
