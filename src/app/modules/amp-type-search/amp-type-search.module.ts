import { NgModule } from '@angular/core';
import { AmpTypeSearchComponent } from './components/amp-type-search/amp-type-search.component';
import { AmpDirectivesModule } from '../amp-directives/amp-directives.module';
import { AmpInputsModule } from '../amp-inputs/amp-inputs.module';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
@NgModule( {
    declarations : [
        AmpTypeSearchComponent
    ] ,
    imports      : [
        AmpSharedRootModule ,
        AmpDirectivesModule ,
        AmpInputsModule
    ] ,
    exports      : [ AmpTypeSearchComponent ]
} )
export class AmpTypeSearchModule {
}
