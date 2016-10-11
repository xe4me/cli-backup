import { NgModule } from '@angular/core';
import { AmpCheckboxComponent } from './components/amp-checkbox/amp-checkbox.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { ScrollService } from '../../services/scroll/scroll.service';
const DECLARATIONS = [ AmpCheckboxComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    providers    : [ ScrollService ] ,
    exports      : DECLARATIONS
} )
export class AmpCheckboxModule {
}
