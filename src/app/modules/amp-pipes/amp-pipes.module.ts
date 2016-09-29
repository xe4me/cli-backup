import { NgModule } from '@angular/core';
import { AmpKeysPipe } from './pipes/keys/amp-keys.pipe';
import { AmpCurrencyPipe } from './pipes/currency/amp-currency.pipe';
import { AmpValuesPipe } from './pipes/values/amp-values.pipe';
const DECLARATIONS = [ AmpCurrencyPipe , AmpKeysPipe , AmpValuesPipe ];
@NgModule( {
    declarations : DECLARATIONS ,
    exports      : DECLARATIONS
} )
export class AmpPipesModule {
}
