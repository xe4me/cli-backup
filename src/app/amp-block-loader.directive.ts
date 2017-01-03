import {
    Input,
    ViewContainerRef,
    Directive,
    Output,
    EventEmitter,
    Compiler,
    ComponentFactoryResolver
} from '@angular/core';
import {
    AmpBlockLoader,
    RequireMethod
} from './amp-block-loader';
@Directive( {
    selector : '[amp-block-loader]'
} )
export class AmpBlockLoaderDirective extends AmpBlockLoader {
    @Input( 'fdn' ) fdn                     = [];
    @Input( 'requireMethod' ) requireMethod = RequireMethod[ RequireMethod.IN_ORDER ];
    @Output() loaded : EventEmitter<any>    = new EventEmitter<any>();

    @Input( 'amp-block-loader' ) set blockLoader ( _blockLoader ) {
        this._blockLoader = _blockLoader;
        if ( this._form && !this.hasLoadedWithInput ) {
            this.reload();
            this.hasLoadedWithInput = true;
        }
    };

    get blockLoader () {
        return this._blockLoader;
    }

    @Input() set form ( _form ) {
        if ( !this._form ) {
            this._form = _form;
            if ( this.blockLoader && !this.hasLoadedWithInput ) {
                this.reload();
                this.hasLoadedWithInput = true;
            }
        }
    }

    get form () {
        return this._form;
    }

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
