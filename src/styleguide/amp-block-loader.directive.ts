import {
    Input,
    ViewContainerRef,
    Directive,
    ComponentFactoryResolver,
    Output,
    EventEmitter,
    Compiler
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpBlockLoader, RequireMethod } from '../app/amp-block-loader';
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
        let myChunk = null;
        try {
            myChunk = require( '../../src/app/' + path + '\.ts' );
        } catch ( err ) {
            try {
                console.log( 'Did not find the experience components, maybe we are not in an experience' );
                myChunk = require( '../../src/styleguide/blocks/' + path + '\.ts' );
            } catch ( err ) {
                console.log( 'Did not find it in styleguide blocks, let look for it in styleguide sections' );
                myChunk = require( '../../src/styleguide/sections/' + path + '\.ts' );
            }
        }
        return myChunk;
    }
}
