import {
    Input ,
    ViewContainerRef ,
    Directive ,
    ComponentResolver ,
    ComponentRef ,
    Output ,
    EventEmitter ,
    ComponentFactory ,
    OnChanges , OnInit , ViewRef , ComponentFactoryResolver , NgModule , Compiler , ModuleWithComponentFactories
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormSectionService } from '../app/services/form-section/form-section.service';
import { AmpBlockLoader } from '../app/amp-block-loader';

export enum BlockLayout { INLINE , PAGE , SECTION }
export enum RequireMethod { ALL , IN_ORDER }

@Directive( {
    selector : '[amp-block-loader]'
} )
export class AmpBlockLoaderDirective extends AmpBlockLoader implements OnChanges {
    @Input( 'amp-block-loader' ) blockLoader;
    @Input( 'fdn' ) fdn                     = [];
    //@Input( 'form' ) form : FormGroup= new FormGroup( {} );
    @Input( 'form' ) form : FormGroup;
    @Input( 'requireMethod' ) requireMethod = RequireMethod[ RequireMethod.IN_ORDER ];
    @Output() loaded : EventEmitter<any>    = new EventEmitter<any>();

    constructor ( public viewContainer : ViewContainerRef ,
                  public compiler : Compiler ,
                  public formSectionService : FormSectionService ,
                  public componentResolver : ComponentResolver ) {
        super(viewContainer, compiler, formSectionService, componentResolver);
    }

    protected getCustomBundle(path : string) : any {
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


