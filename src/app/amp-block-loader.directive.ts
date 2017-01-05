import {
    ViewContainerRef,
    Directive,
    Compiler,
    ComponentFactoryResolver
} from '@angular/core';
import { AmpBlockLoader } from './amp-block-loader';
@Directive( {
    selector : '[amp-block-loader]'
} )
export class AmpBlockLoaderDirective extends AmpBlockLoader {

    constructor ( public viewContainer : ViewContainerRef,
                  public compiler : Compiler,
                  public componentFactoryResolver : ComponentFactoryResolver ) {
        super( viewContainer, compiler, componentFactoryResolver );
    }

    protected getCustomBundle ( path : string ) : any {
        try {
            return require( '../../../../src/app/' + path + '\.ts' );
        } catch ( err ) {
            console.log( 'Cannot find path: ' + path );
        }
        return null;
    }
}
