import { NgModule } from '@angular/core';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpLinearProgressBarComponent } from './components/amp-linear-progress-bar/amp-linear-progress-bar.component';
import { MdProgressBarModule, MdProgressCircleModule } from '@angular/material';
import { AmpLoadingComponent } from './components/amp-loading/amp-loading.component';
const DECLARATIONS = [ AmpLoadingComponent, AmpLinearProgressBarComponent ];
@NgModule( {
    declarations : DECLARATIONS,
    imports : [
        MdProgressCircleModule,
        MdProgressBarModule,
        AmpSharedRootModule
    ],
    exports : DECLARATIONS
} )
export class AmpProgressBarsModule {
}
