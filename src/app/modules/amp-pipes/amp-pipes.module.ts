import { NgModule } from '@angular/core';
import { AmpKeysPipe } from "./keys/amp-keys.pipe";
import { AmpCurrencyPipe } from "./currency/amp-currency.pipe";
import { AmpValuesPipe } from "./values/amp-values.pipe";
const DECLARATIONS = [ AmpCurrencyPipe , AmpKeysPipe , AmpValuesPipe ];
@NgModule( {
    declarations : DECLARATIONS ,
    exports      : DECLARATIONS
} )
export class AmpPipesModule {
}
