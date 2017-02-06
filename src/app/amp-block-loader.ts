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
import { clone } from './modules/amp-utils';
import {
    each,
    size,
    set
} from 'lodash';
export enum BlockLayout { INLINE, PAGE, SECTION, COMPONENT }
export enum RequireMethod { ALL, IN_ORDER }
export interface LoadedBlockInfo {
    fdn : Array<(string|number)>;
    name : string;
}
export interface LoadNextOptions {
    allowMultiple : boolean;
}
export interface RemoveNextOptions {
    removableDef : FormDefinition;
}
export abstract class AmpBlockLoader {
    @Input( 'fdn' ) fdn                     = [];
    @Input( 'requireMethod' ) requireMethod = RequireMethod[ RequireMethod.ALL ];
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
    public blocksCount : number              = 0;
    public hasLoadedWithInput : boolean      = false;
    public retrievedFiles                    = [];
    public _blocks : FormDefinition[]        = [];
    public _form;
    public _sectionName;

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

    removeByFdn ( _fdn : Array<string | number> ) : Promise<any> {
        return new Promise( ( resolve ) => {

            for (let i = 0; i < this.viewContainer.length; i++) {
                if (this.viewContainer.get(i)['fdn'].join('') === _fdn.join('')) {
                    this.viewContainer.remove(i);
                    break;
                }
            }
            resolve( _fdn );
        } );
    }

    loadAt ( _def : FormDefinition, _index : number ) : Promise<ComponentRef<any>> {
        if ( this.isBlockAlreadyLoaded( _def ) ) {
            return Promise.resolve();
        }
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

    abstract getCustomBundle ( path : string ) : any;

    getCommonBundle ( path : string ) : any {
        try {
            return require( 'bundle-loader!amp-ddc-components/src/app/' + path + '\.ts' );
        } catch ( err ) {
            console.log( 'Oops!! Trying to load ' + 'bundle!amp-ddc-components/src/app/' + path + '\.ts' + ' from node_modules but not components found.' );
        }
        return null;
    }

    loadAndCreate ( formDef : FormDefinition, _requireMethod ) {
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
        for ( let _index = 0; _index < this._blocks.length; _index++ ) {
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
            let childsLoadedSubscription;
            let comp            = _componentRef.instance;
            let _fdn            = [ ...this.fdn, ...this.parseFdnOfBlockName( _blockDef.name ) ];

            _componentRef.hostView['fdn'] = _fdn;

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
            this.createOrRetrieveCG( _blockDef, comp, _form );
            comp.__controlGroup.__fdn        = _fdn;
            comp.__controlGroup.__prettyName = _blockDef.prettyName || _blockDef.name;
            _componentRef.onDestroy( () => {
                _form.removeControl( _blockDef.name );
                if ( childsLoadedSubscription ) {
                    childsLoadedSubscription.unsubscribe();
                }
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
            if ( _blockDef.custom ) {
                this.copyCustomFields( _blockDef, comp );
            }
            comp.__removeAt            = ( index : number ) : Promise<number> => {
                return this.removeAt( index );
            };
            comp.__removeByFdn         = ( fdn : Array<string | number> ) : Promise<any> => {
                return this.removeByFdn( fdn );
            };
            comp.__removeNext          = ( _viewContainerRef : ViewContainerRef, options? ) : Promise<number> => {
                return this.removeNext( _viewContainerRef, options );
            };
            comp.__removeAllAfter      = ( _viewContainerRef : ViewContainerRef ) : Promise<number> => {
                return this.removeAllAfter( _viewContainerRef );
            };
            comp.__removeAllAfterIndex = ( index : number ) : Promise<any> => {
                return this.removeAllAfterIndex( index );
            };
            comp.__removeSelf          = ( _viewContainerRef : ViewContainerRef ) : Promise<any> => {
                return this.removeSelf( _viewContainerRef );
            };
            comp.__getIndex            = ( _viewContainerRef : ViewContainerRef ) : number => {
                return this.getIndex( _viewContainerRef );
            };
            comp.__loadNext            = ( _def : FormDefinition,
                                           _viewContainerRef : ViewContainerRef,
                                           options? ) : Promise<ComponentRef<any>> => {
                return this.loadNext( _def, _viewContainerRef, options );
            };
            comp.__loadAt              = ( _def : FormDefinition,
                                           index : number ) : Promise<ComponentRef<any> > => {
                return this.loadAt( _def, index );
            };
            comp.__loadAllNext         = ( _def : FormDefinition[],
                                           _viewContainerRef : ViewContainerRef ) : Promise<Array<ComponentRef<any>>> => {
                return this.loadAllNext( _def, _viewContainerRef );
            };
            comp.__onChildsLoaded      = ( cb ) : void => {
                childsLoadedSubscription = this.$childsLoaded.subscribe( ( _loadedBlockInfo : LoadedBlockInfo ) => {
                    cb( _loadedBlockInfo );
                } );
            };
            comp.__emitChildLoaded     = ( _loadedBlockInfo : LoadedBlockInfo ) : void => {
                this.emitChildLoaded( _loadedBlockInfo );
            };
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

    loadAllSync ( _def : FormDefinition, _index : number ) {
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

    requireFile ( _defOrPath : FormDefinition|string ) {
        let myChunk      = null;
        let waitForChunk = null;
        if ( typeof _defOrPath === 'string' ) {
            myChunk = this.getCustomBundle( _defOrPath );
        } else {
            if ( _defOrPath.commonBlock ) {
                if ( _defOrPath.blockLayout ) {
                    waitForChunk = this.getCommonBundle( _defOrPath.path );
                }
            } else {
                myChunk = this.getCustomBundle( _defOrPath.path );
            }
        }
        if ( myChunk ) {
            return ( _callback ) => {
                _callback( myChunk );
            };
        }
        return waitForChunk;
    }

    storeFile ( file : any, block : FormDefinition, _index : number ) {
        this.retrievedFiles[ _index ] = {
            file,
            block
        };
    }

    createAllRecursively ( _index : number ) {
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

    emitLoadedAll () {
        setTimeout( () => {
            this.loaded.emit( 'loaded' );
            this.retrievedFiles = [];
        } );
    }

    getViewRefOfViewContainerRef ( _viewContainerRef : ViewContainerRef ) : ViewRef {
        return <ViewRef> (<any> _viewContainerRef)._element.parentView.ref;
    }

    getIndex ( _viewContainerRef : ViewContainerRef ) : number {
        return this.getIndexOfComponent( _viewContainerRef );
    }

    removeAllAfter ( _viewContainerRef : ViewContainerRef ) : Promise<any> {
        let index = this.getIndex( _viewContainerRef );
        return this.removeAllAfterIndex( index );
    }

    removeAllAfterIndex ( _index : number ) : Promise<any> {
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

    removeSelf ( _viewContainerRef : ViewContainerRef ) : Promise<any> {
        return this.removeAt( this.getIndex( _viewContainerRef ) );
    }

    loadNext ( _def : FormDefinition,
               _viewContainerRef : ViewContainerRef,
               options : LoadNextOptions = {
                   allowMultiple : false
               } ) : Promise<ComponentRef<any>> {

        if ( !options.allowMultiple ) {
            if ( this.isBlockAlreadyLoaded( _def ) ) {
                return Promise.resolve();
            }
        }

        let index = this.getIndex( _viewContainerRef );
        if ( index !== undefined ) {
            index++;
        }
        return this.loadAt( _def, index );
    }

    isBlockAlreadyLoaded ( _def : FormDefinition ) : boolean {
        return !!this.form.get( [ ...this.fdn, _def.name ] );
    }

    loadAllNext ( _def : FormDefinition[],
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

    getIndexOfComponent ( _viewContainerRef : ViewContainerRef ) : number {
        let viewRef = this.getViewRefOfViewContainerRef( _viewContainerRef );
        return this.viewContainer.indexOf( viewRef );
    }

    removeNext ( _viewContainerRef : ViewContainerRef, options : RemoveNextOptions = { removableDef : null } ) : Promise<number> {
        let index = this.getIndexOfComponent( _viewContainerRef );
        if ( index !== undefined ) {
            index++;
        }
        if ( options.removableDef ) {
            if ( this.isBlockAlreadyLoaded( options.removableDef ) ) {
                return Promise.resolve( index );
            }
        }

        return this.removeAt( index );
    }

    private copyCustomFields ( _blockDef : FormDefinition, comp : any ) {
        if ( typeof _blockDef.custom === 'object' ) {
            this.mergeCustoms( comp, _blockDef.custom );
        } else if ( typeof _blockDef.custom === 'string' ) {
            // assuming that this is a path to a file that should be loaded and replaced with custom
            // like "custom":"src/app/blocks/quote/applicant-details/applicant-details-config.ts"
            // and this file should always be inside the experience
            // important to NOTE :
            // the file should be typescript
            // the file should export the json file as default like :
            // export default MyJson;
            if ( _blockDef.custom ) {
                let pathToCustomFile = _blockDef.custom;
                if ( _blockDef.custom === '~~' ) {
                    pathToCustomFile = _blockDef.path.split( '.' )[ 0 ] + '.config';
                } else if ( _blockDef.custom.startsWith( '~' ) ) {
                    let relativePathArray = _blockDef.path.split( '/' );
                    relativePathArray.pop(); // we don't want the last bit
                    pathToCustomFile = `${relativePathArray.join( '/' )}/${pathToCustomFile.replace( '~', '' )}`;
                }
                let customFileChunk = this.requireFile( pathToCustomFile );
                customFileChunk( ( customFile ) => {
                    this.mergeCustoms( comp, clone( customFile[ 'default' ] ) );
                } );
            }
        } else {
            comp.__custom = _blockDef.custom; // IT COULD BE AN ARRAY OR SOMETHING ELSE
        }
    }

    private mergeCustoms ( comp : any, customs ) {
        if ( comp.__custom && customs.overrides ) { // means we have default values inside the component class already
            this.overrideCustomProperties( comp.__custom, customs.overrides );
        } else { // replace
            comp.__custom = customs;
        }
        comp.isActive = comp.__custom.isInitiallyActive;
    }

    private overrideCustomProperties ( defaultValues, newValues ) {
        // Override default values if custom values are provided
        if ( size( newValues ) > 0 ) {
            each( newValues, ( value, key ) => {
                set( defaultValues, key, value );
            } );
        }
        return defaultValues;
    }

    private createOrRetrieveCG ( _blockDef : FormDefinition, comp : any, _form : any ) {
        if ( _blockDef.name ) {
            if ( _form.get( _blockDef.name ) ) {
                comp.__controlGroup = _form.get( _blockDef.name );
                comp.__isRetrieved  = true;
            } else {
                let paths = _blockDef.name.split( '.' );
                paths.map( ( cgName ) => {
                    if ( _form.contains( cgName ) ) {
                        _form = _form.get( cgName );
                    } else {
                        let cg = new FormGroup( {} );
                        _form.addControl( cgName, cg );
                        _form = cg;
                    }
                } );
                comp.__controlGroup = _form;
            }
        } else {
            comp.__controlGroup = _form;
        }
    }

    private parseFdnOfBlockName ( blockName : string ) : Array<string|number> {
        return blockName ? blockName.split( '.' ) : [];
    }
}
