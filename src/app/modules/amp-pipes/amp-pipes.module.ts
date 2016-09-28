import { NgModule } from '@angular/core';
import { AmpKeysPipe , AmpCurrencyPipe , AmpValuesPipe } from './index';
const DECLARATIONS = [ AmpCurrencyPipe , AmpKeysPipe , AmpValuesPipe ];
@NgModule( {
    declarations : DECLARATIONS ,
    exports      : DECLARATIONS
} )
export class AmpPipesModule {
}
