import {
    Input ,
    ViewContainerRef ,
    Directive ,
    ComponentResolver ,
    Output ,
    EventEmitter ,
    Compiler
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormSectionService } from './services/form-section/form-section.service';
import { AmpBlockLoader } from './amp-block-loader';
export enum BlockLayout { INLINE , PAGE , SECTION }
export enum RequireMethod { ALL , IN_ORDER }
export interface LoadedBlockInfo {
    fdn : (string|number)[];
    name : string;
}
@Directive( {
    selector : '[amp-block-loader]'
} )
export class AmpBlockLoaderDirective extends AmpBlockLoader {
    @Input( 'amp-block-loader' ) blockLoader;
    @Input( 'fdn' ) fdn                     = [];
    @Input( 'form' ) form : FormGroup;
    @Input( 'requireMethod' ) requireMethod = RequireMethod[ RequireMethod.IN_ORDER ];
    @Output() loaded : EventEmitter<any>    = new EventEmitter<any>();

    constructor ( public viewContainer : ViewContainerRef ,
                  public compiler : Compiler ,
                  public formSectionService : FormSectionService ,
                  public componentResolver : ComponentResolver ) {
        super( viewContainer , compiler , formSectionService , componentResolver );
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
