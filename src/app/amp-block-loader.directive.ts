import {
    Input ,
    ViewContainerRef ,
    Directive ,
    ComponentResolver ,
    ComponentRef ,
    Output ,
    EventEmitter ,
    ComponentFactory ,
    OnChanges , OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormSectionService } from './services/form-section/form-section.service';
import { Subscription } from "rxjs";
export enum BlockLayout { INLINE , PAGE , SECTION }
export enum RequireMethod { ALL , IN_ORDER }
@Directive( {
    selector : '[amp-block-loader]'
} )
export class AmpBlockLoaderDirective implements OnInit {
    @Input( 'amp-block-loader' ) blockLoader;
    @Input( 'fdn' ) fdn                     = [];
    @Input( 'form' ) form : FormGroup;
    @Input( 'requireMethod' ) requireMethod = RequireMethod[ RequireMethod.IN_ORDER ];
    @Output() loaded : EventEmitter<any>    = new EventEmitter<any>();
    private _hasLoadedOnce : boolean        = false;
    private blocksCount : number            = 0;
    private retrievedFiles                  = [];
    private _blocks                         = [];

    constructor ( private viewContainer : ViewContainerRef ,
                  private formSectionService : FormSectionService ,
                  private componentResolver : ComponentResolver ) {
    }

    ngOnChanges ( changes : any ) : any {
        if ( this._hasLoadedOnce === true ) {
            return;
        }
        if ( changes.blockLoader ) {
            this.loadAndCreate( changes.blockLoader.currentValue , this.requireMethod );
        }
        this._hasLoadedOnce = true;
        return undefined;
    }

    createComponent ( _currentLoadedBlock , _index ) {
        return this.componentResolver
                   .resolveComponent( _currentLoadedBlock )
                   .then( ( componentFactory : ComponentFactory<any> ) => {
                       return this.viewContainer.createComponent( componentFactory , _index );
                   } );
    }

    private loadAndCreate ( formDef : any , _requireMethod = RequireMethod.IN_ORDER ) {
        this._blocks = formDef.blocks;
        if ( ! this._blocks ) {
            return;
        }
        this.blocksCount = this._blocks.length;
        let _blockName   = formDef.name;
        if ( _blockName && this.fdn.indexOf( _blockName ) < 0 ) {
            this.fdn.push( _blockName );
        }
        for ( let _index = 0 ; _index < this._blocks.length ; _index ++ ) {
            if ( _requireMethod === RequireMethod.ALL ) {
                this.loadAllAt( this._blocks[ _index ] , _index );
            } else {
                this.loadAt( this._blocks[ _index ] , _index );
            }
        }
    }

    private registerSection ( _section : any ) {
        this.formSectionService.registerSection( _section );
    }

    private copyFormBlockDefProperty ( _componentRef : ComponentRef<any> , _blockDef , _index : number ) {
        let _fdn                              = this.fdn.concat( _blockDef.name ? [ _blockDef.name ] : [] );
        _componentRef.instance.__child_blocks = _blockDef;
        _componentRef.instance.__form         = this.form;
        _componentRef.instance.__formDef      = this.formDef;
        _componentRef.instance.__fdn          = _fdn;
        _componentRef.instance.__index        = _index;
        _blockDef.__fdn                       = _fdn;
        if ( _blockDef.name ) {
            let _form                             = _componentRef.instance.__form;
            _componentRef.instance.__controlGroup = new FormGroup( {} );
            for ( let i = 0 ; i < this.fdn.length ; i ++ ) {
                if ( _form.controls[ this.fdn[ i ] ] ) {
                    _form = _form.controls[ this.fdn[ i ] ];
                }
            }
            _form.addControl( _blockDef.name , _componentRef.instance.__controlGroup );
            _componentRef.onDestroy( ()=> {
                _form.removeControl( _blockDef.name );
            } );
        }
        if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.SECTION ] ) {
            this.registerSection( _blockDef );
        }
        _componentRef.instance.__path        = _blockDef.path;
        _componentRef.instance.__blockType   = _blockDef.blockType;
        _componentRef.instance.__blockLayout = _blockDef.blockLayout;
        _componentRef.instance.__name        = _blockDef.name;
        if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.PAGE ] ) {
            _componentRef.instance.__page = _blockDef.page;
        }
        _componentRef.instance.__custom   = _blockDef.custom;
        _componentRef.instance.__loadAt   = ( _def , _index : number ) : void=> {
            this.loadAt( _def , _index );
        };
        _componentRef.instance.__removeAt = ( _index : number ) : void=> {
            this.removeAt( _index );
        };
        _componentRef.changeDetectorRef.detectChanges();
    }

    private loadAllAt ( _def : any , _index : number ) {
        this.retrievedFiles[ _index ] = null;
        let waitForChunk              = this.requireFile( _def );
        waitForChunk( ( file ) => {
            Object.keys( file ).map( ( _file ) => {
                this.storeFile( file[ _file ] , _def , _index );
                if ( this.retrievedFiles.length === this.blocksCount ) {
                    this.createAllRecursively( 0 );
                }
            } );
        } );
    }

    private requireFile ( _def ) {
        let myChunk      = null;
        let waitForChunk = null;
        if ( _def.commonBlock ) {
            if ( _def.blockLayout ) {
                try {
                    waitForChunk = require( 'bundle!amp-ddc-components/src/app/' + _def.path + '\.ts' );
                } catch ( err ) {
                    console.warn( 'Oops!! Trying to load components from node_modules but not fount at path: ' + _def.path );
                }
            } else {
            }
        } else {
            try {
                myChunk = require( '../../src/app/' + _def.path + '\.ts' );
            } catch ( err ) {
                console.log( 'Did not find the experience components at path:' + _def.path );
                myChunk = require( '../../src/styleguide/blocks' + _def.path + '\.ts' );
            }
        }
        if ( myChunk ) {
            return ( _callback )=> {
                _callback( myChunk );
            }
        }
        return waitForChunk;
    }

    private storeFile ( file : any , block : any , _index : number ) {
        this.retrievedFiles[ _index ] = {
            file     : file ,
            blockDef : block
        };
    }

    private createAllRecursively ( _index ) {
        this.createComponent( this.retrievedFiles[ _index ].file , _index )
            .then( ( componentRef : ComponentRef<any> ) => {
                if ( _index === (this._blocks.length - 1) ) {
                    this.emitLoadedAll();
                }
                this.copyFormBlockDefProperty( componentRef , this.retrievedFiles[ _index ].blockDef , _index );
                if ( (_index += 1) < this.blocksCount ) {
                    this.createAllRecursively( _index );
                }
            } );
    }

    removeAt ( _index : number ) {
        this.viewContainer.remove( _index );
    }

    loadAt ( _def , _index : number ) {
        let waitForChunk = this.requireFile( _def );
        waitForChunk( ( file ) => {
            Object.keys( file ).map( ( _file ) => {
                this.createComponent( file[ _file ] , _index )
                    .then( ( componentRef : ComponentRef<any> ) => {
                        if ( _index === (this._blocks.length - 1) ) {
                            this.emitLoadedAll();
                        }
                        this.copyFormBlockDefProperty( componentRef , _def , _index );
                    } );
            } );
        } );
    }

    private emitLoadedAll () {
        setTimeout( () => {
            this.loaded.emit( 'loaded' );
            this.retrievedFiles = [];
        } );
    }
}
