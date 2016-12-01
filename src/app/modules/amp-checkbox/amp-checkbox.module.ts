import { NgModule } from '@angular/core';
import { AmpCheckboxComponent } from './components/amp-checkbox/amp-checkbox.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { ScrollService } from '../../services/scroll/scroll.service';
import { AmpErrorModule } from '../amp-error/amp-error.module';
const DECLARATIONS = [ AmpCheckboxComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpErrorModule,
        AmpSharedRootModule
    ] ,
    providers    : [ ScrollService ] ,
    exports      : DECLARATIONS
} )
export class AmpCheckboxModule {
}
