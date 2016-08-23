import {
    Input ,
    ViewContainerRef ,
    Directive ,
    ComponentResolver ,
    ComponentRef ,
    Output ,
    EventEmitter ,
    ComponentFactory ,
    OnChanges
} from '@angular/core';
import { FormSectionService } from 'amp-ddc-ui-core/ui-core';
export enum BlockLayout { INLINE , PAGE , SECTION }
export enum RequireMethod { ALL , IN_ORDER }
@Directive( { selector : '[amp-block-loader]' } )
export class AmpBlockLoaderDirective implements OnChanges {
    @Input( 'amp-block-loader' ) blockLoader;
    @Input( 'fdn' ) fdn                     = [];
    @Input( 'requireMethod' ) requireMethod = RequireMethod[ RequireMethod.IN_ORDER ];
    private _hasLoadedOnce                  = false;
    private blocksCount                     = 0;
    private retrievedFiles                  = [];
    private _blocks                         = [];
    @Output() loaded : EventEmitter<any>    = new EventEmitter<any>();

    constructor ( private viewContainer : ViewContainerRef ,
                  private formSectionService : FormSectionService ,
                  private componentResolver : ComponentResolver ) {
    }

    ngOnChanges ( changes : any ) : any {
        if ( this._hasLoadedOnce === true ) {
            return;
        }
        if ( changes.blockLoader ) {
            if ( this.requireMethod === RequireMethod[ RequireMethod.ALL ] ) {
                this.loadAll( changes.blockLoader.currentValue );
            } else {
                this.load( changes.blockLoader.currentValue );
            }
        }
        this._hasLoadedOnce = true;
        return undefined;
    }

    createComponent ( _currentLoadedBlock , _index , _childDef ) {
        return this.componentResolver
                   .resolveComponent( _currentLoadedBlock )
                   .then( ( componentFactory : ComponentFactory<any> ) => {
                       return this.viewContainer.createComponent( componentFactory , _index );
                   } )
                   .then( ( componentRef : ComponentRef<any> ) => {
                       if ( _index === (this._blocks.length - 1) ) {
                           setTimeout( () => {
                               this.loaded.emit( _index );
                           } );
                       }
                       componentRef.onDestroy( () => {
                       } );
                       this.copyFormBlockDefProperty( componentRef , _childDef );
                       componentRef.changeDetectorRef.detectChanges();
                   } );
    }

    createComponentRecursive ( _currentLoadedBlock , _index , _childDef ) {
        return this.componentResolver
                   .resolveComponent( _currentLoadedBlock )
                   .then( ( componentFactory : ComponentFactory<any> ) => {
                       return this.viewContainer.createComponent( componentFactory , _index );
                   } );
    }

    private load ( formDef : any ) {
        this._blocks = formDef.blocks;
        if ( ! this._blocks ) {
            return;
        }
        this.blocksCount = this._blocks.length;
        let _blockName   = formDef.name;
        if ( _blockName && this.fdn.indexOf( _blockName ) < 0 ) {
            this.fdn.push( _blockName );
        }
        for ( let i = 0 ; i < this._blocks.length ; i ++ ) {
            var myChunk      = null;
            var waitForChunk = null;
            if ( this._blocks[ i ].commonBlock ) {
                if ( this._blocks[ i ].blockLayout ) {
                    waitForChunk = require( 'bundle!amp-ddc-components/src/app/' + this._blocks[ i ].path + '\.ts' );
                } else {
                }
            } else {
                myChunk = require( '../../../../src/app/' + this._blocks[ i ].path + '\.ts' );
            }
            if ( myChunk ) {
                let type = null;
                if ( myChunk[ 'default' ] ) {
                    type = myChunk[ 'default' ];
                } else {
                    type = myChunk[ this._blocks[ i ].blockType ];
                }
                this.createComponent( type , i , this._blocks[ i ] );
            } else {
                waitForChunk( ( file ) => {
                    Object.keys( file ).map( ( _file ) => {
                        this.createComponent( file[ _file ] , i , this._blocks[ i ] );
                    } );
                } );
            }
        }
    }

    private registerSection ( _section : any ) {
        this.formSectionService.registerSection( _section );
    }

    private copyFormBlockDefProperty ( _componentRef : ComponentRef<any> , _blockDef ) {
        _componentRef.instance._child_blocks = _blockDef;
        _componentRef.instance._fdn          = this.fdn.concat( _blockDef.name ? [ _blockDef.name ] : [] );
        _blockDef._fdn                       = this.fdn.concat( _blockDef.name ? [ _blockDef.name ] : [] );
        if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.SECTION ] ) {
            this.registerSection( _blockDef );
        }
        _componentRef.instance.path        = _blockDef.path;
        _componentRef.instance.blockType   = _blockDef.blockType;
        _componentRef.instance.blockLayout = _blockDef.blockLayout;
        _componentRef.instance.name        = _blockDef.name;
        _componentRef.instance._id         = _blockDef._id;
        if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.PAGE ] ) {
            Object.assign( _componentRef.instance , _blockDef.page );
        }
        if ( _blockDef.custom ) {
            Object.assign( _componentRef.instance , _blockDef.custom );
        }
    }

    private loadAll ( formDef : any ) {
        this._blocks = formDef.blocks;
        if ( ! this._blocks ) {
            return;
        }
        this.blocksCount = this._blocks.length;
        let _blockName   = formDef.name;
        if ( _blockName && this.fdn.indexOf( _blockName ) < 0 ) {
            this.fdn.push( _blockName );
        }
        for ( let i = 0 ; i < this._blocks.length ; i ++ ) {
            var myChunk      = null;
            var waitForChunk = null;
            if ( this._blocks[ i ].commonBlock ) {
                if ( this._blocks[ i ].blockLayout ) {
                    waitForChunk = require( 'bundle!amp-ddc-components/src/app/' + this._blocks[ i ].path + '\.ts' );
                } else {
                }
            } else {
                myChunk = require( '../../../../src/app/' + this._blocks[ i ].path + '\.ts' );
            }
            this.retrievedFiles[ i ] = null;
            if ( myChunk ) {
                let type = null;
                if ( myChunk[ 'default' ] ) {
                    type = myChunk[ 'default' ];
                } else {
                    type = myChunk[ this._blocks[ i ].blockType ];
                }
                this.storeFile( type , this._blocks[ i ] , i );
                if ( this.retrievedFiles.length === this.blocksCount ) {
                    this.createAllRecursively( 0 );
                }
            } else {
                waitForChunk( ( file ) => {
                    Object.keys( file ).map( ( _file ) => {
                        this.storeFile( file[ _file ] , this._blocks[ i ] , i );
                        if ( this.retrievedFiles.length === this.blocksCount ) {
                            this.createAllRecursively( 0 );
                        }
                    } );
                } );
            }
        }
    }

    private storeFile ( file : any , block : any , _index : number ) {
        this.retrievedFiles[ _index ] = {
            file     : file ,
            blockDef : block
        };
    }

    private createAllRecursively ( _index ) {
        this.createComponentRecursive( this.retrievedFiles[ _index ].file , _index , this.retrievedFiles[ _index ].blockDef )
            .then( ( componentRef : ComponentRef<any> ) => {
                if ( _index === (this._blocks.length - 1) ) {
                    setTimeout( () => {
                        this.loaded.emit( _index );
                    } );
                }
                this.copyFormBlockDefProperty( componentRef , this.retrievedFiles[ _index ].blockDef );
                if ( (_index += 1) < this.blocksCount ) {
                    this.createAllRecursively( _index );
                }
                componentRef.changeDetectorRef.detectChanges();
            } );
    }
}
