import { NgModule } from '@angular/core';
import { AmpStandAloneMenuComponent } from './components/amp-standalone-menu/amp-standalone-menu.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
const DECLARATIONS = [ AmpStandAloneMenuComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpStandAloneMenuModule {
}
/*
 * TODO : @Sean : Please consider if you don't need FormsModule or ReactiveFormModule , please remove them from your
 * imports
 * */