import { NgModule } from '@angular/core';
import { AmpCardComponent } from './components/amp-card/amp-card.component';
import { AmpCardsComponent } from './components/amp-cards/amp-cards.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpCardComponent, AmpCardsComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpCardsModule {
}
