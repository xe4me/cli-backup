import {
    Component ,
    Input ,
    ComponentResolver ,
    ChangeDetectorRef ,
    ElementRef ,
    ViewChild ,
    ViewContainerRef ,
    Directive ,
    ComponentFactory ,
    ComponentRef ,
} from '@angular/core';
import { Dir } from '@angular2-material/core/rtl/dir';
import { MdButton } from '@angular2-material/button/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { MdIcon } from '@angular2-material/icon/icon';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { IExampleData } from './app';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Highlight } from './highlight';
export interface ISourceFile {
    data : string;
    type : string;
    label : string;
}
@Directive( { selector : '[example]' } )
export class ExampleDirective {
    constructor ( private cd : ChangeDetectorRef ,
                  private viewContainer : ViewContainerRef ,
                  private componentResolver : ComponentResolver ) {
    }

    createComponent ( dialogComponent : { new() : any } ) : Promise<ComponentRef<any>> {
        this.viewContainer.clear();
        let componentCreated = this.componentResolver
                                   .resolveComponent( dialogComponent )
                                   .then( ( componentFactory : ComponentFactory<any> ) => {
                                       return this.viewContainer.createComponent( componentFactory );
                                   } );
        componentCreated.then( ( componentRef : ComponentRef<any> ) => {
            this.cd.detectChanges();
            // dialogComponentRef.instance.close.subscribe(() => {
            //     dialogComponentRef.destroy();
            // });
        } );
        return componentCreated;
    }
}
@Component( {
    selector    : 'example' ,
    inputs      : [ 'templateData' , 'stylesData' , 'sourceData' , 'showSource' , 'orderedFiles' ] ,
    templateUrl : 'src/styleguide/example.html' ,
    styles      : [ require( './example.scss' ).toString() ] ,
    directives  : [
        MD_SIDENAV_DIRECTIVES ,
        MD_TABS_DIRECTIVES ,
        MD_LIST_DIRECTIVES ,
        MD_ICON_DIRECTIVES ,
        MD_TOOLBAR_DIRECTIVES ,
        ExampleDirective ,
        Highlight ,
        Dir ,
        MdButton ,
        MdIcon
    ]
} )
export class ExampleComponent {
    public orderedFiles : ISourceFile[] = [];
    public showExample : boolean        = true;
    @Input() public selected : string   = 'html';
    private _model : IExampleData       = null;
    private _loaded : boolean           = false;

    @Input()
    set model ( value : IExampleData ) {
        this._model = value;
        this.applyModel( value );
    }

    get model () : IExampleData {
        return this._model;
    }

    get loaded () : boolean {
        return this._loaded;
    }

    @ViewChild( ExampleDirective ) exampleDirective : ExampleDirective;
    //@Query( MdTabs ) public panes : QueryList<MdTabs> ,
    constructor ( public http : Http , ) {
    }

    applyModel ( model : IExampleData ) {
        this.orderedFiles = [];
        this._loaded      = false;
        // Fetch template, styles, and source strings for display.
        if ( model.template ) {
            this.addFile( model.template , 'html' , 'html' );
        }
        if ( model.styles ) {
            this.addFile( model.styles , 'stylus' , 'scss' );
        }
        if ( model.source ) {
            this.addFile( model.source , 'typescript' , 'typescript' );
        }
        if ( model.galen ) {
            this.addFile( model.galen , 'typescript' , 'Galen' );
        }
        if ( model.jasmine ) {
            this.addFile( model.jasmine , 'typescript' , 'Jasmine' );
        }
        var exampleInstance = this;
        var waitForChunk    = require( 'bundle!./' + this._model.component_src_location + '\.ts' );
        waitForChunk( function( file ) {
            exampleInstance.exampleDirective.createComponent( file[ 'default' ] );
        } );
    }

    addFile ( url : string , type : string , label : string ) {
        let desc : ISourceFile = {
            type  : type ,
            label : label ,
            data  : ''
        };
        this.http.get( url ).subscribe( ( res : Response ) => {
            desc.data = res.text();
        } );
        this.orderedFiles.push( desc );
    }

    toggleSource () {
        this.showExample = !this.showExample;
    }
}
