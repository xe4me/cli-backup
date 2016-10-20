import { NgModule , ModuleWithProviders } from '@angular/core';
import { AmpTooltipComponent } from './components/amp-tooltip/amp-tooltip.component';
import { AmpTooltipDirective } from './directives/amp-tooltip/amp-tooltip.directive';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpDirectivesModule } from '../amp-directives/amp-directives.module';
import { OverlayModule } from '@angular2-material/core';
const DECLARATIONS = [ AmpTooltipDirective , AmpTooltipComponent ];
@NgModule( {
    declarations    : DECLARATIONS ,
    imports         : [
        AmpDirectivesModule ,
        OverlayModule ,
        AmpSharedRootModule
    ] ,
    exports         : DECLARATIONS ,
    entryComponents : [ AmpTooltipComponent ] ,
} )
export class AmpTooltipModule {
    static forRoot () : ModuleWithProviders {
        return {
            ngModule : AmpTooltipModule
        };
    }
}
