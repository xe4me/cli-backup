import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import { AmpLoadingButtonComponent } from './components/amp-loading-button/amp-loading-button.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpProgressBarsModule } from '../amp-progress-bars/amp-progress-bars.module';
import { AmpButtonModule } from '../amp-button/amp-button.module';
import {
    Http,
    XHRBackend,
    RequestOptions
} from '@angular/http';
import { AmpHttpInterceptor } from './services/amp-http-interceptor/amp-http-interceptor.service';
import { AmpLoadingService } from 'app/modules/amp-loading-button/services/amp-loading/amp-loading.service';
const DECLARATIONS       = [ AmpLoadingButtonComponent ];
const interceptorFactory =
          ( backend : XHRBackend, defaultOptions : RequestOptions, loadingService : AmpLoadingService ) =>
              new AmpHttpInterceptor( backend, defaultOptions, loadingService )
@NgModule( {
    declarations : DECLARATIONS,
    imports      : [
        AmpButtonModule,
        AmpProgressBarsModule,
        AmpSharedRootModule
    ],
    exports      : DECLARATIONS
} )
export class AmpLoadingButtonModule {

    static forRoot () : ModuleWithProviders {
        return {
            ngModule  : AmpLoadingButtonModule,
            providers : [
                AmpLoadingService,
                {
                    provide    : Http,
                    useFactory : interceptorFactory,
                    deps       : [ XHRBackend, RequestOptions, AmpLoadingService ]
                }
            ]
        };
    }
}
