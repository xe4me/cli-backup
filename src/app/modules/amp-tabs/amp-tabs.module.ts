import { NgModule } from '@angular/core';
import { AmpTabComponent } from './components/amp-tab/amp-tab.component';
import { AmpTabsComponent } from './components/amp-tabs/amp-tabs.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpTabComponent, AmpTabsComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpTabsModule {
}
