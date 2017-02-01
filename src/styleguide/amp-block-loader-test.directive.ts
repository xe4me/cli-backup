import {
    ViewContainerRef,
    Directive,
    ComponentFactoryResolver,
    Compiler
} from '@angular/core';
import { AmpBlockLoader } from '../app/amp-block-loader';
@Directive( {
    selector : '[amp-block-loader]'
} )
export class AmpBlockLoaderDirective extends AmpBlockLoader {

    constructor ( public viewContainer : ViewContainerRef,
                  public compiler : Compiler,
                  public componentFactoryResolver : ComponentFactoryResolver ) {
        super( viewContainer, compiler, componentFactoryResolver );
    }

    getCustomBundle ( path : string ) : any {
        let myChunk = null;
        try {
            myChunk = require( '../../src/app/' + path + '.ts' );
        } catch ( err ) {
            console.error( `Did not find the component to load: ${path}` );
        }
        return myChunk;
    }
}