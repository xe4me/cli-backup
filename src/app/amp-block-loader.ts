import {
    Input,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Compiler,
    ViewRef,
    Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormDefinition } from './interfaces/form-def.interface';
export enum BlockLayout { INLINE, PAGE, SECTION , COMPONENT }
export enum RequireMethod { ALL, IN_ORDER }
export interface LoadedBlockInfo {
    fdn : Array<(string|number)>;
    name : string;
}
export abstract class AmpBlockLoader {
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

    public _blockLoader;
    public $childsLoaded : EventEmitter<any> = new EventEmitter<any>();
    protected blocksCount : number           = 0;
    protected hasLoadedWithInput : boolean   = false;
    protected retrievedFiles                 = [];
    protected _blocks : FormDefinition[]     = [];
    protected _form;
    protected _sectionName;

    constructor ( public viewContainer : ViewContainerRef,
                  public compiler : Compiler,
                  public componentFactoryResolver : ComponentFactoryResolver ) {
    }

    clear () {
        this.viewContainer.clear();
    }

    reload () {
        this.loadAndCreate( this._blockLoader, this.requireMethod );
    }

    createComponent ( _loadedComponent : { new() : any }, _index : number ) {
        let factory = this.componentFactoryResolver
                          .resolveComponentFactory( _loadedComponent );
        return this.viewContainer.createComponent( factory, _index );
    }

    removeAt ( _index : number ) : Promise<number> {
        return new Promise( ( resolve ) => {
            this.viewContainer.remove( _index );
            resolve( _index );
        } );
    }

    loadAt ( _def : FormDefinition, _index : number ) : Promise<ComponentRef<any>> {
        return new Promise( ( resolve, reject ) => {
            let waitForChunk = this.requireFile( _def );
            if ( !waitForChunk ) {
                return reject( 'waitForChunk is empty  ' );
            }
            waitForChunk( ( file ) => {
                let keys         = Object.keys( file );
                let componentRef = this.createComponent( file[ keys[ 0 ] ], _index );
                if ( _index === ( this._blocks.length - 1 ) ) {
                    this.emitLoadedAll();
                }
                resolve( this.copyFormBlockDefProperty( componentRef, _def ) );
            } );
        } );
    }

    /*
     * @method : emitChildLoaded
     * This is a public method that should only be called by the nested blocks that are loading blocks
     * A simple scenario is when you have a block , inside blocks and that block is using a amp-block-loaded , sometimes
     * you want to notice you parent block that you've finished loading , so then you can call this function and if
     * any parent block is interested , can pass a callback and then get notified when all DIRECT childs are loaded
     * */
    emitChildLoaded ( _loadedBlockInfo : LoadedBlockInfo ) {
        this.$childsLoaded.emit( _loadedBlockInfo );
    }

    protected abstract getCustomBundle ( path : string ) : any;

    protected getCommonBundle ( path : string ) : any {
        try {
            return require( 'bundle-loader!amp-ddc-components/src/app/' + path + '\.ts' );
        } catch ( err ) {
            console.log( 'Oops!! Trying to load ' + 'bundle!amp-ddc-components/src/app/' + path + '\.ts' + ' from node_modules but not components found.' );
        }
        return null;
    }

    protected loadAndCreate ( formDef : FormDefinition, _requireMethod ) {
        if ( formDef.blockLayout === BlockLayout[ BlockLayout.SECTION ] ) {
            this._sectionName = formDef.name;
        }
        this._blocks = formDef.blocks;
        if ( !this._blocks ) {
            return;
        }
        this.blocksCount = this._blocks.length;
        let _blockName   = formDef.name;
        if ( _blockName && this.fdn.indexOf( _blockName ) < 0 ) {
            this.fdn.push( _blockName );
        }
        for ( let _index = 0 ; _index < this._blocks.length ; _index++ ) {
            if ( _requireMethod === RequireMethod.ALL ) {
                this.loadAllSync( this._blocks[ _index ], _index );
            } else {
                this.loadAt( this._blocks[ _index ], _index );
            }
        }
    }


    copyForComponent ( _componentRef : ComponentRef<any>,
                       _blockDef : FormDefinition ) : Promise<ComponentRef<any>> {
        return new Promise( ( resolve ) => {
            let comp                = _componentRef.instance;
            comp.controlGroup       = this.form.get( this.fdn );
            let _fdn                = this.fdn.concat( _blockDef.name ? [ _blockDef.name ] : [] );
            comp.__fdn              = _fdn;
            comp.controlGroup.__fdn = _fdn;
            if ( _blockDef.custom ) {
                Object.keys( _blockDef.custom ).map( ( prop ) => {
                    comp[ prop ] = _blockDef.custom[ prop ];
                } );
            }
            _componentRef.changeDetectorRef.detectChanges();
            resolve( _componentRef );
        } );
    }

    copyForBlock ( _componentRef : ComponentRef<any>,
                   _blockDef : FormDefinition ) : Promise<ComponentRef<any>> {
        return new Promise( ( resolve ) => {
            let comp            = _componentRef.instance;
            let _fdn            = this.fdn.concat( _blockDef.name ? [ _blockDef.name ] : [] );
            comp.__child_blocks = _blockDef;
            comp.__form         = this.form;
            comp.__loader       = this;
            comp.__fdn          = _fdn;
            let _form           = comp.__form;
            for ( const fdnItem of this.fdn ) {
                if ( _form.controls[ fdnItem ] ) {
                    _form = _form.controls[ fdnItem ];
                }
            }
            if ( _blockDef.name ) {
                if ( _form.contains( _blockDef.name ) ) {
                    comp.__controlGroup = _form.get( _blockDef.name );
                    comp.__isRetrieved  = true;
                } else {
                    comp.__controlGroup = new FormGroup( {} );
                    _form.addControl( _blockDef.name, comp.__controlGroup );
                }
            } else {
                comp.__controlGroup = _form;
            }
            comp.__controlGroup.__fdn        = _fdn;
            comp.__controlGroup.__prettyName = _blockDef.prettyName || _blockDef.name;
            _componentRef.onDestroy( () => {
                _form.removeControl( _blockDef.name );
            } );

            if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.SECTION ] ) {
                if ( comp.__controlGroup ) {
                    comp.__controlGroup.custom = _blockDef.custom;
                }
            }
            comp.__path        = _blockDef.path;
            comp.__blockType   = _blockDef.blockType;
            comp.__blockLayout = _blockDef.blockLayout;
            comp.__name        = _blockDef.name;
            comp.__sectionName = this._sectionName;
            if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.PAGE ] ) {
                comp.__page = _blockDef.page;
            }
            comp.__custom = _blockDef.custom;
            _componentRef.changeDetectorRef.detectChanges();
            resolve( _componentRef );
        } );
    }

    copyFormBlockDefProperty ( _componentRef : ComponentRef<any>,
                               _blockDef : FormDefinition ) : Promise<ComponentRef<any>> {
        if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.COMPONENT ] ) {
            return this.copyForComponent( _componentRef, _blockDef );
        } else {
            return this.copyForBlock( _componentRef, _blockDef );
        }
    }


    protected loadAllSync ( _def : FormDefinition, _index : number ) {
        this.retrievedFiles[ _index ] = null;
        let waitForChunk              = this.requireFile( _def );
        waitForChunk( ( file ) => {
            let keys = Object.keys( file );
            this.storeFile( file[ keys[ 0 ] ], _def, _index );
            if ( this.retrievedFiles.length === this.blocksCount ) {
                this.createAllRecursively( 0 );
            }
        } );
    }

    protected requireFile ( _def : FormDefinition ) {
        let myChunk      = null;
        let waitForChunk = null;
        if ( _def.commonBlock ) {
            if ( _def.blockLayout ) {
                waitForChunk = this.getCommonBundle( _def.path );
            }
        } else {
            myChunk = this.getCustomBundle( _def.path );
        }
        if ( myChunk ) {
            return ( _callback ) => {
                _callback( myChunk );
            };
        }
        return waitForChunk;
    }

    protected storeFile ( file : any, block : FormDefinition, _index : number ) {
        this.retrievedFiles[ _index ] = {
            file,
            block
        };
    }

    protected createAllRecursively ( _index : number ) {
        let componentRef = this.createComponent( this.retrievedFiles[ _index ].file, _index );
        if ( _index === (this._blocks.length - 1) ) {
            this.emitLoadedAll();
        }
        this.copyFormBlockDefProperty( componentRef, this.retrievedFiles[ _index ].block );
        _index += 1;
        if ( _index < this.blocksCount ) {
            this.createAllRecursively( _index );
        }
    }

    protected emitLoadedAll () {
        setTimeout( () => {
            this.loaded.emit( 'loaded' );
            this.retrievedFiles = [];
        } );
    }

    protected getViewRefOfViewContainerRef ( _viewContainerRef : ViewContainerRef ) : ViewRef {
        return <ViewRef> (<any> _viewContainerRef)._element.parentView.ref;
    }

    protected getIndex ( _viewContainerRef : ViewContainerRef ) : number {
        return this.getIndexOfComponent( _viewContainerRef );
    }

    protected removeAllAfter ( _viewContainerRef : ViewContainerRef ) : Promise<any> {
        let index = this.getIndex( _viewContainerRef );
        return this.removeAllAfterIndex( index );
    }

    protected removeAllAfterIndex ( _index : number ) : Promise<any> {
        return new Promise( ( resolve, reject ) => {
            let initialLength = this.viewContainer.length - 1;
            if ( _index !== undefined && initialLength > -1 ) {
                while ( this.viewContainer.length > (_index + 1) ) {
                    this.removeAt( this.viewContainer.length - 1 );
                }
                resolve( {
                    removed : initialLength - _index,
                    length  : this.viewContainer.length
                } );
            } else {
                reject( 'index undefined' );
            }
        } );
    }

    protected loadNext ( _def : FormDefinition, _viewContainerRef : ViewContainerRef ) : Promise<ComponentRef<any>> {
        let index = this.getIndex( _viewContainerRef );
        if ( index !== undefined ) {
            index++;
        }
        return this.loadAt( _def, index );
    }

    protected loadAllNext ( _def : FormDefinition[],
                            _viewContainerRef : ViewContainerRef ) : Promise<any> {
        let promises = [];
        if ( _def && _def.length ) {
            let index = this.getIndex( _viewContainerRef );
            if ( index !== undefined ) {
                index++;
            }
            for ( let def of _def ) {
                promises.push( this.loadAt( def, index ) );
                index++;
            }
            return Promise.all( promises );
        }
        return Promise.reject( 'def is empty' );
    }

    protected getIndexOfComponent ( _viewContainerRef : ViewContainerRef ) : number {
        let viewRef = this.getViewRefOfViewContainerRef( _viewContainerRef );
        return this.viewContainer.indexOf( viewRef );
    }

    protected removeNext ( _viewContainerRef : ViewContainerRef ) : Promise<number> {
        let index = this.getIndexOfComponent( _viewContainerRef );
        if ( index !== undefined ) {
            index++;
        }
        return this.removeAt( index );
    }
}
