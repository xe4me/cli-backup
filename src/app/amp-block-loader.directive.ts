import {
    ViewContainerRef,
    Directive,
    Compiler,
    ComponentFactoryResolver
} from '@angular/core';
import { AmpBlockLoader } from 'amp-ddc-components';
@Directive( {
    selector : '[amp-block-loader]',
    exportAs : 'loader'
} )
export class AmpBlockLoaderDirective extends AmpBlockLoader {

    constructor ( public viewContainer : ViewContainerRef,
                  public compiler : Compiler,
                  public componentFactoryResolver : ComponentFactoryResolver ) {
        super( viewContainer, compiler, componentFactoryResolver );
    }

    public getCustomBundle ( path : string ) : any {
        try {
            return require( './' + path + '\.ts' );
        } catch ( err ) {
            console.warn( 'Cannot find path: ' + path ); // eslint-disable-line no-console
        }
        return null;
    }
}
