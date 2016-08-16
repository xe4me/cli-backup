import {
    Input ,
    ChangeDetectorRef ,
    ViewContainerRef ,
    Directive ,
    ComponentResolver ,
    ComponentRef ,
    ComponentFactory , OnChanges , SimpleChanges
} from '@angular/core';
import {
    FormModelService ,
    ScrollService ,
    ProgressObserverService ,
    AmpHttpService ,
    BaseForm ,
    UIControlService ,
    FormSectionService
} from 'amp-ddc-ui-core/ui-core';
export enum BlockLayout { INLINE , PAGE , SECTION }
;
@Directive( { selector : '[children]' } )
export class ChildrenDirective implements OnChanges {
    @Input( 'children' ) children;
    @Input( 'fdn' ) fdn = [];
    private parentFdn   = [];

    ngOnChanges ( changes : any ) : any {
        if ( changes.children ) {
            this.load( changes.children.currentValue );
        }
        if ( changes.fdn ) {
            this.setCurrentFdn( changes.fdn.currentValue );
        }
        return undefined;
    }

    constructor ( private cd : ChangeDetectorRef ,
                  private viewContainer : ViewContainerRef ,
                  private controlService : UIControlService ,
                  private formSectionService : FormSectionService ,
                  private componentResolver : ComponentResolver ) {
    }

    createComponent ( _currentLoadedBlock , _index , _childDef ) {
        this.viewContainer.clear();
        return this.componentResolver
                   .resolveComponent( _currentLoadedBlock )
                   .then( ( componentFactory : ComponentFactory<any> ) => {
                       return this.viewContainer
                                  .createComponent( componentFactory , _index )
                   } )
                   .then( ( componentRef : ComponentRef<any> ) => {
                       componentRef.onDestroy( ()=> {
                           console.log( 'Destroying' , componentRef );
                       } );

                       /*
                        TODO : Ask Eric if we still need this ?
                        componentRef.instance.preBindControls ( formBlock );
                        // Invoke the bind all method on each dcl component to bind all component control to formModel
                        componentRef.instance.bindControls ( this.formModel , componentRef.instance );
                        // Invoke the post bind Hook
                        componentRef.instance.postBindControls ();*/
                       this.copyFormBlockDefProperty( componentRef , _childDef );
                       componentRef.changeDetectorRef.detectChanges();
                   } );
    }

    load ( formDef : any ) {
        let _blocks    = formDef.blocks;
        let _blockName = formDef.name;
        if ( _blockName && this.fdn.indexOf( _blockName ) < 0 ) {
            this.fdn.push( _blockName );
        }
        for ( let i = 0 ; i < _blocks.length ; i ++ ) {
            var myChunk      = null;
            var waitForChunk = null;
            if ( _blocks[ i ].commonBlock ) {
                if ( _blocks[ i ].blockLayout ) {
                    waitForChunk = require( 'bundle!amp-ddc-components/src/app/' + _blocks[ i ].path + '\.ts' );
                } else {
                }
            } else {
                myChunk = require( '../../../../src/app/' + _blocks[ i ].path + '\.ts' );
            }
            if ( myChunk ) {
                let type = null;
                if ( myChunk[ 'default' ] ) {
                    type = myChunk[ 'default' ];
                } else {
                    type = myChunk[ _blocks[ i ].blockType ];
                }
                this.createComponent( type , i , _blocks[ i ] );
            } else {
                waitForChunk( ( file )=> {
                    Object.keys( file ).map( ( _file )=> {
                        this.createComponent( file[ _file ] , i , _blocks[ i ] );
                    } )
                } );
            }
        }
    }

    private registerSection ( _section : any ) {
        this.formSectionService.registerSection( _section )
    }

    private setCurrentFdn ( currentValue : any ) {
        this.parentFdn = currentValue;
    }

    copyFormBlockDefProperty ( _componentRef : ComponentRef<any> , _blockDef ) {

        /*New */
        _componentRef.instance._child_blocks = _blockDef;
        _componentRef.instance._fdn          = this.fdn.concat( _blockDef.name ? [ _blockDef.name ] : [] );
        _blockDef._fdn                      = this.fdn.concat( _blockDef.name ? [ _blockDef.name ] : [] );
        if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.SECTION ]) {
            this.registerSection( _blockDef );
        }
        /*New */


        // Generic FormBlock properties
        _componentRef.instance.path        = _blockDef.path;
        _componentRef.instance.blockType   = _blockDef.blockType;
        _componentRef.instance.blockLayout = _blockDef.blockLayout;
        _componentRef.instance.name        = _blockDef.name;
        _componentRef.instance._id         = _blockDef._id;
        // // Generic FormBlock generated properties
        // if ( _blockDef.fullyDistinguishedName && ! _componentRef.instance.fullyDistinguishedName ) {
        //     _componentRef.instance.fullyDistinguishedName = _blockDef.fullyDistinguishedName;
        // }
        // FormPage properties
        if ( _blockDef.blockLayout === BlockLayout[ BlockLayout.PAGE ] ) {
            Object.assign( _componentRef.instance , _blockDef.page );
        }
        // FormBlock custom properties
        // if ( _blockDef.custom ) {
        //     Object.assign( _ref.instance , _blockDef.custom );
        //     for ( let prop in _blockDef.custom ) {
        //         if ( typeof(_blockDef.custom[ prop ]) === 'function' ) {
        //             _ref.instance[ prop ] = _blockDef.custom[ prop ].bind( _ref.instance );
        //         }
        //     }
        // }
        if ( _blockDef.custom ) {
            Object.assign( _componentRef.instance , { custom : _blockDef.custom } );
            // for ( let prop in _componentRef.instance.custom ) {
            //     if ( typeof(_componentRef.instance.custom[ prop ]) === 'function' ) {
            //         _componentRef.instance[ prop ] = _componentRef.instance.custom[ prop ].bind( _componentRef.instance );
            //     }
            // }
        }
    }
}