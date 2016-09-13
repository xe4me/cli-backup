import {
    Component ,
    Input ,
    ComponentResolver ,
    ChangeDetectorRef ,
    NgZone ,
    ViewChild ,
    ViewContainerRef ,
    Directive ,
    ComponentFactory ,
    ComponentRef ,
} from '@angular/core';
import { Dir } from '@angular2-material/core/rtl/dir';
import { MD_RIPPLE_DIRECTIVES, PORTAL_DIRECTIVES } from '@angular2-material/core';
import { MdButton } from '@angular2-material/button/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_TABS_DIRECTIVES, TABS_INTERNAL_DIRECTIVES } from '@angular2-material/tabs';
import { MdIcon } from '@angular2-material/icon/icon';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { IComponentExample } from './services/components';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Highlight } from './highlight';
import { ThemeService } from './services/theme';
export interface ISourceFile {
    data : string;
    type : string;
    label : string;
}
@Directive( { selector : '[example-ref]' } )
export class ExampleDirective {
    constructor ( private cd : ChangeDetectorRef ,
                  private viewContainer : ViewContainerRef ,
                  private componentResolver : ComponentResolver ) {
    }

    createComponent ( dialogComponent : { new() : any } ) : Promise<ComponentRef<any>> {
        this.viewContainer.clear();
        return this.componentResolver
                   .resolveComponent( dialogComponent )
                   .then( ( componentFactory : ComponentFactory<any> ) => {
                       return this.viewContainer.createComponent( componentFactory );
                   } );
    }
}
@Component( {
    selector   : 'example' ,
    inputs     : [ 'templateData' , 'stylesData' , 'sourceData' , 'showSource' , 'orderedFiles' ] ,
    template   : require( './example.html' ) ,
    styles     : [ require( './example.scss' ).toString() ] ,
    directives : [
        MD_SIDENAV_DIRECTIVES ,
        MD_TABS_DIRECTIVES ,
        MD_LIST_DIRECTIVES ,
        MD_ICON_DIRECTIVES ,
        MD_TOOLBAR_DIRECTIVES ,
        ExampleDirective ,
        Highlight ,
        Dir ,
        MdButton ,
        MdIcon,
        MD_RIPPLE_DIRECTIVES,
        TABS_INTERNAL_DIRECTIVES,
        PORTAL_DIRECTIVES
    ]
} )
export class ExampleComponent {
    @ViewChild( ExampleDirective ) exampleDirective : ExampleDirective;
    public orderedFiles : ISourceFile[] = [];
    public showExample : boolean        = true;
    @Input() public selected : string   = 'html';
    private _model : IComponentExample  = null;
    private _loaded : boolean           = false;

    @Input()
    set model ( value : IComponentExample ) {
        this._model = value;
        this.applyModel( value );
    }

    get model () : IComponentExample {
        return this._model;
    }

    get loaded () : boolean {
        return this._loaded;
    }

    // @Query( MdTabs ) public panes : QueryList<MdTabs> ,
    constructor ( public themeService : ThemeService , public http : Http , public cd : ChangeDetectorRef ,
                  public zone : NgZone ) {
    }

    applyModel ( model : IComponentExample ) {
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
        let waitForChunk = require( 'bundle!./' + this._model.component_src_location + '\.ts' );
        waitForChunk( ( file ) => {
            this.exampleDirective
                .createComponent( file[ 'default' ] )
                .then( ( componentRef : ComponentRef<any> ) => {
                    componentRef.changeDetectorRef.detectChanges();
                } );
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
        this.showExample = ! this.showExample;
    }
}
