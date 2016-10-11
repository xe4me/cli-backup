import { NgModule } from '@angular/core';
import { AmpTypeaheadComponent } from './components/amp-typeahead/amp-typeahead.component';
import { AmpDirectivesModule } from '../amp-directives/amp-directives.module';
import { AmpInputsModule } from '../amp-inputs/amp-inputs.module';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
@NgModule( {
    declarations : [
        AmpTypeaheadComponent
    ] ,
    imports      : [
        AmpSharedRootModule ,
        AmpDirectivesModule ,
        AmpInputsModule
    ] ,
    exports      : [ AmpTypeaheadComponent ]
} )
export class AmpTypeaheadModule {
}
