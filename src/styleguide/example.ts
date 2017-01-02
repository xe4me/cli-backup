import {
    Component,
    Input,
    ChangeDetectorRef,
    NgZone,
    ViewChild,
    ViewContainerRef,
    Directive,
    ComponentFactoryResolver
} from '@angular/core';
import { IComponentExample } from './services/components';
import {
    Http,
    Response
} from '@angular/http';
import { ThemeService } from './services/theme';
export interface ISourceFile {
    data : string;
    type : string;
    label : string;
}
@Directive( { selector : '[example-ref]' } )
export class ExampleDirective {
    constructor ( private viewContainer : ViewContainerRef,
                  private componentFactoryResolver : ComponentFactoryResolver ) {
    }

    createComponent ( dialogComponent : { new() : any } ) {
        this.viewContainer.clear();
        let factory = this.componentFactoryResolver.resolveComponentFactory( dialogComponent );
        return this.viewContainer.createComponent( factory );
    }
}
@Component( {
    selector : 'example',
    inputs   : [ 'templateData', 'stylesData', 'sourceData', 'showSource', 'orderedFiles' ],
    template : require( './example.html' ),
    styles   : [ require( './example.scss' ).toString() ]
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
    constructor ( public themeService : ThemeService, public http : Http, public cd : ChangeDetectorRef,
                  public zone : NgZone ) {
    }

    applyModel ( model : IComponentExample ) {
        this.orderedFiles = [];
        this._loaded      = false;
        // Fetch template, styles, and source strings for display.
        if ( model.template ) {
            this.addFile( model.template, 'html', 'html' );
        }
        if ( model.styles ) {
            this.addFile( model.styles, 'stylus', 'scss' );
        }
        if ( model.source ) {
            this.addFile( model.source, 'typescript', 'typescript' );
        }
        if ( model.galen ) {
            this.addFile( model.galen, 'typescript', 'Galen' );
        }
        if ( model.jasmine ) {
            this.addFile( model.jasmine, 'typescript', 'Jasmine' );
        }

        let file         = require( './' + this._model.component_src_location + '\.ts' );
        let componentRef = this.exampleDirective.createComponent( file[ 'default' ] );
        componentRef.changeDetectorRef.detectChanges();

    }

    addFile ( url : string, type : string, label : string ) {
        let desc : ISourceFile = {
            type,
            label,
            data : ''
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
