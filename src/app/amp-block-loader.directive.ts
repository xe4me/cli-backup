import {
    Input,
    ViewContainerRef,
    Directive,
    Output,
    EventEmitter,
    Compiler,
    ComponentFactoryResolver
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpBlockLoader, RequireMethod } from './amp-block-loader';
@Directive( {
    selector : '[amp-block-loader]'
} )
export class AmpBlockLoaderDirective extends AmpBlockLoader {
    @Input( 'amp-block-loader' ) blockLoader;
    @Input( 'fdn' ) fdn = [];
    @Input( 'form' ) form : FormGroup;
    @Input( 'requireMethod' ) requireMethod = RequireMethod[ RequireMethod.IN_ORDER ];
    @Output() loaded : EventEmitter<any> = new EventEmitter<any>();

    constructor( public viewContainer : ViewContainerRef,
                 public compiler : Compiler,
                 public componentFactoryResolver : ComponentFactoryResolver ) {
        super( viewContainer, compiler, componentFactoryResolver );
    }

    protected getCustomBundle( path : string ) : any {
        try {
            return require( '../../../../src/app/' + path + '\.ts' );
        } catch ( err ) {
            console.log( 'Cannot find path: ' + path );
        }
        return null;
    }
}
