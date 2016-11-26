import { NgModule, ModuleWithProviders } from '@angular/core';
import { AmpTooltipComponent, AmpTooltipTemplateComponent } from './components/amp-tooltip/amp-tooltip.component';
import { AmpTooltipDirective } from './directives/amp-tooltip/amp-tooltip.directive';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpDirectivesModule } from '../amp-directives/amp-directives.module';
import { OverlayModule, Overlay } from '@angular/material';
const DECLARATIONS = [ AmpTooltipDirective, AmpTooltipComponent ];
@NgModule( {
    declarations : [ ...DECLARATIONS, AmpTooltipTemplateComponent ],
    providers : [ Overlay ],
    imports : [
        AmpDirectivesModule,
        OverlayModule,
        AmpSharedRootModule
    ],
    exports : DECLARATIONS,
    entryComponents : [ AmpTooltipComponent, AmpTooltipTemplateComponent ],
} )
export class AmpTooltipModule {
    static forRoot() : ModuleWithProviders {
        return {
            ngModule : AmpTooltipModule
        };
    }
}
