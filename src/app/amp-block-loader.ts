import {
    Input,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Compiler,
    ViewRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormDefinition } from './interfaces/form-def.interface';
export enum BlockLayout { INLINE, PAGE, SECTION }
export enum RequireMethod { ALL, IN_ORDER }
export interface LoadedBlockInfo {
    fdn : Array<(string|number)>;
    name : string;
}
export abstract class AmpBlockLoader {
    public blockLoader;
    public fdn                               = [];
    public requireMethod                     = RequireMethod[ RequireMethod.IN_ORDER ];
    public loaded : EventEmitter<any>        = new EventEmitter<any>();
    public $childsLoaded : EventEmitter<any> = new EventEmitter<any>();
    private blocksCount : number             = 0;
    private retrievedFiles                   = [];
    private _blocks : FormDefinition[]       = [];
    private _form;
    private _sectionName;

    constructor ( public viewContainer : ViewContainerRef,
                  public compiler : Compiler,
                  public componentFactoryResolver : ComponentFactoryResolver ) {
    }

    @Input() set form ( _form ) {
        if ( !this._form ) {
            this._form = _form;
            this.reload();
        }
    }

    get form () {
        return this._form;
    }

    clear () {
        this.viewContainer.clear();
    }

    reload () {
        this.loadAndCreate( this.blockLoader, this.requireMethod );
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

    /*
     * TODO : When ever upgraded to RC7 , this should be used , For Sean :)
     * */
    // createComponent ( _loadedComponent , _index : number ) : Promise<ComponentRef<any>> {
    //     return this.compiler
    //                .compileModuleAndAllComponentsAsync( this.createComponentModule( _loadedComponent ) )
    //                .then( ( moduleWithCF : ModuleWithComponentFactories<any> ) => {
    //                    console.log( 'moduleWithCF' , moduleWithCF );
    //                    const cf = moduleWithCF.componentFactories
    //                                           .find( x => x.componentType === _loadedComponent );
    //                    return this.viewContainer.createComponent( cf , _index );
    //                } );
    // }
    // createComponentModule ( componentType : any ) {
    //     @NgModule( {
    //         declarations : [ componentType ] ,
    //     } )
    //     class RuntimeComponentModule {
    //     }
    //     return RuntimeComponentModule;
    // }
    protected abstract getCustomBundle ( path : string ) : any;

    protected getCommonBundle ( path : string ) : any {
        try {
            return require( 'bundle-loader!amp-ddc-components/src/app/' + path + '\.ts' );
        } catch ( err ) {
            console.log( 'Oops!! Trying to load ' + 'bundle!amp-ddc-components/src/app/' + path + '\.ts' + ' from node_modules but not components found.' );
        }
        return null;
    }

    private loadAndCreate ( formDef : FormDefinition, _requireMethod ) {
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

    private copyFormBlockDefProperty ( _componentRef : ComponentRef<any>,
                                       _blockDef : FormDefinition ) : Promise<ComponentRef<any>> {
        return new Promise( ( resolve ) => {
            let childsLoadedsubscription;
            let _fdn                              = this.fdn.concat( _blockDef.name ? [ _blockDef.name ] : [] );
            _componentRef.instance.__child_blocks = _blockDef;
            _componentRef.instance.__form         = this.form;
            _componentRef.instance.__fdn          = _fdn;
            if ( _blockDef.name ) {
                let _form = _componentRef.instance.__form;
                for ( const fdnItem of this.fdn ) {
                    if ( _form.controls[ fdnItem ] ) {
                        _form = _form.controls[ fdnItem ];
                    }
                }
                if ( _form.contains( _blockDef.name ) ) {
                    _componentRef.instance.__controlGroup = _form.get( _blockDef.name );
                    _componentRef.instance.__isRetrieved  = true;
                } else {
                    _componentRef.instance.__controlGroup = new FormGroup( {} );
                    _form.addControl( _blockDef.name, _componentRef.instance.__controlGroup );
                }
                _componentRef.instance.__controlGroup.__fdn        = _fdn;
                _componentRef.instance.__controlGroup.__prettyName = _blockDef.prettyName || _blockDef.name;
                _componentRef.onDestroy( () => {
                    _form.removeControl( _blockDef.name );
                    if ( childsLoadedsubscription ) {
                        childsLoadedsubscription.unsubscribe();
                    }
                } );
            }
            if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.SECTION ] ) {
                if ( _componentRef.instance.__controlGroup ) {
                    _componentRef.instance.__controlGroup.custom = _blockDef.custom;
                }
            }
            _componentRef.instance.__path        = _blockDef.path;
            _componentRef.instance.__blockType   = _blockDef.blockType;
            _componentRef.instance.__blockLayout = _blockDef.blockLayout;
            _componentRef.instance.__name        = _blockDef.name;
            _componentRef.instance.__sectionName = this._sectionName;
            if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.PAGE ] ) {
                _componentRef.instance.__page = _blockDef.page;
            }
            _componentRef.instance.__custom              = _blockDef.custom;
            _componentRef.instance.__loadNext            = ( _def : FormDefinition,
                                                             _viewContainerRef : ViewContainerRef ) : Promise<ComponentRef<any>> => {
                return this.loadNext( _def, _viewContainerRef );
            };
            _componentRef.instance.__loadAt              = ( _def : FormDefinition,
                                                             index : number ) : Promise<ComponentRef<any> > => {
                return this.loadAt( _def, index );
            };
            _componentRef.instance.__removeAt            = ( index : number ) : Promise<number> => {
                return this.removeAt( index );
            };
            _componentRef.instance.__removeNext          = ( _viewContainerRef : ViewContainerRef ) : Promise<number> => {
                return this.removeNext( _viewContainerRef );
            };
            _componentRef.instance.__removeAllAfterIndex = ( index : number ) : Promise<any> => {
                return this.removeAllAfterIndex( index );
            };
            _componentRef.instance.__removeAllAfter      = ( _viewContainerRef : ViewContainerRef ) : Promise<number> => {
                return this.removeAllAfter( _viewContainerRef );
            };
            _componentRef.instance.__loadAllNext         = ( _def : FormDefinition[],
                                                             _viewContainerRef : ViewContainerRef ) : Promise<ComponentRef<any[]>> => {
                return this.loadAllNext( _def, _viewContainerRef );
            };
            _componentRef.instance.__getIndex            = ( _viewContainerRef : ViewContainerRef ) : number => {
                return this.getIndex( _viewContainerRef );
            };
            _componentRef.instance.__onChildsLoaded      = ( cb ) : void => {
                childsLoadedsubscription = this.$childsLoaded.subscribe( ( _loadedBlockInfo : LoadedBlockInfo ) => {
                    cb( _loadedBlockInfo );
                } );
            };
            _componentRef.instance.__emitChildLoaded     = ( _loadedBlockInfo : LoadedBlockInfo ) : void => {
                this.emitChildLoaded( _loadedBlockInfo );
            };
            _componentRef.changeDetectorRef.detectChanges();
            resolve( _componentRef );
        } );
    }

    private loadAllSync ( _def : FormDefinition, _index : number ) {
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

    private requireFile ( _def : FormDefinition ) {
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

    private storeFile ( file : any, block : FormDefinition, _index : number ) {
        this.retrievedFiles[ _index ] = { file, block };
    }

    private createAllRecursively ( _index : number ) {
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

    private emitLoadedAll () {
        setTimeout( () => {
            this.loaded.emit( 'loaded' );
            this.retrievedFiles = [];
        } );
    }

    private getViewRefOfViewContainerRef ( _viewContainerRef : ViewContainerRef ) : ViewRef {
        return <ViewRef> (<any> _viewContainerRef)._element.parentView.ref;
    }

    private getIndex ( _viewContainerRef : ViewContainerRef ) : number {
        return this.getIndexOfComponent( _viewContainerRef );
    }

    private removeAllAfter ( _viewContainerRef : ViewContainerRef ) : Promise<any> {
        let index = this.getIndex( _viewContainerRef );
        return this.removeAllAfterIndex( index );
    }

    private removeAllAfterIndex ( _index : number ) : Promise<any> {
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

    private loadNext ( _def : FormDefinition, _viewContainerRef : ViewContainerRef ) : Promise<ComponentRef<any>> {
        let index = this.getIndex( _viewContainerRef );
        if ( index !== undefined ) {
            index++;
        }
        return this.loadAt( _def, index );
    }

    private loadAllNext ( _def : FormDefinition[],
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

    private getIndexOfComponent ( _viewContainerRef : ViewContainerRef ) : number {
        let viewRef = this.getViewRefOfViewContainerRef( _viewContainerRef );
        return this.viewContainer.indexOf( viewRef );
    }

    private removeNext ( _viewContainerRef : ViewContainerRef ) : Promise<number> {
        let index = this.getIndexOfComponent( _viewContainerRef );
        if ( index !== undefined ) {
            index++;
        }
        return this.removeAt( index );
    }
}
