import { NgModule } from '@angular/core';
import { AmpPopDownComponent } from './components/amp-pop-down/amp-pop-down.component';
import { AmpPopDownDirective } from './directives/amp-pop-down/amp-pop-down.directive';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpDirectivesModule } from '../amp-directives';
const DECLARATIONS = [ AmpPopDownDirective, AmpPopDownComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpDirectivesModule ,
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpPopDownModule {
}
