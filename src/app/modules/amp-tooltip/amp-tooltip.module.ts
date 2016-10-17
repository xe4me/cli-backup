import { NgModule , ModuleWithProviders } from '@angular/core';
import { AmpTooltipComponent } from './components/amp-tooltip/amp-tooltip.component';
import { AmpTooltipDirective } from './directives/amp-tooltip/amp-tooltip.directive';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { OverlayModule , OVERLAY_PROVIDERS } from '@angular2-material/core';
import { ClickedOutsideDirective } from '../amp-directives/directives/clicked-outside/clicked-outside.directive';
import { AmpDirectivesModule } from '../../../../dist/src/app/modules/amp-directives/amp-directives.module';
const DECLARATIONS = [ AmpTooltipDirective , AmpTooltipComponent ];
@NgModule( {
    declarations    : DECLARATIONS ,
    imports         : [
        AmpDirectivesModule.loadOnly( [ ClickedOutsideDirective ] ) ,
        OverlayModule ,
        AmpSharedRootModule
    ] ,
    exports         : DECLARATIONS ,
    entryComponents : [ AmpTooltipComponent ] ,
} )
export class AmpTooltipModule {
    static forRoot () : ModuleWithProviders {
        return {
            ngModule  : AmpTooltipModule ,
            providers : OVERLAY_PROVIDERS ,
        };
    }
}
