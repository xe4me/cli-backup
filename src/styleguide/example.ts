import { View , Component } from 'angular2/core';
import { Input } from 'angular2/core';
import { DynamicComponentLoader , ChangeDetectorRef } from 'angular2/core';
import { ElementRef } from 'angular2/core';
import { ComponentRef } from 'angular2/core';
import { IExampleData } from './app';
import { DEMO_DIRECTIVES } from './all';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Http } from 'angular2/http';
import { Response } from 'angular2/http';
import { Highlight } from './highlight';
import { TimerWrapper } from 'angular2/src/facade/async';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { MdTabs } from 'ng2-material/components/tabs/tabs';
import { Query } from 'angular2/core';
import { QueryList } from 'angular2/core';
export interface ISourceFile {
    data : string;
    type : string;
    label : string;
}
@Component( {
    selector   : 'example' ,
    properties : [ 'templateData' , 'stylesData' , 'sourceData' , 'showSource' , 'orderedFiles' ]
} )
@View( {
    templateUrl : 'src/styleguide/example.html' ,
    directives  : [ MATERIAL_DIRECTIVES , DEMO_DIRECTIVES , Highlight ]
} )
export default class Example {
    /**
     * The set of source files associated with the example
     */
    public orderedFiles : ISourceFile[] = [];
    /**
     * True to show the source code for the example
     */
    public showSource : boolean         = false;
    /**
     * The selected type of source to view.
     */
    @Input() public selected : string = 'html';
    private _model : IExampleData     = null;
    private _reference : ComponentRef = null;
    private _loaded : boolean         = false;
    private showTabs : boolean        = false;

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

    constructor ( private _element : ElementRef ,
                  public http : Http ,
                  @Query( MdTabs ) public panes : QueryList<MdTabs> ,
                  public dcl : DynamicComponentLoader ,
                  public cd : ChangeDetectorRef ) {
    }

    applyModel ( model : IExampleData ) {
        this.orderedFiles = [];
        this._loaded      = false;
        // Fetch template, styles, and source strings for display.
        if ( model.template ) {
            this.addFile( model.template , 'html' , 'html' );
        }
        if ( model.styles ) {
            this.addFile( model.styles , 'scss' , 'scss' );
        }
        if ( model.source ) {
            this.addFile( model.source , 'typescript' , 'typescript' );
        }
        if ( model.galen ) {
            this.addFile( model.galen , 'stylus' , 'Galen' );
        }
        if ( model.jasmine ) {
            this.addFile( model.jasmine , 'typescript' , 'Jasmine' );
        }
        // Render the example component into the view.
        // let template = `<${model.component}></${model.component}>`;
        // @Component({selector: 'md-example-view'})
        // @View({template: template, directives: [MATERIAL_DIRECTIVES, DEMO_DIRECTIVES]})
        // class CompiledComponent {
        // }
        var exampleInstance = this;
        var waitForChunk    = require( 'bundle!./' + this._model.component_src_location + '\.ts' );
        // TODO: Make sure you try out          var load = require('bundle?lazy!./file.js');
        waitForChunk( function( file ) {
            exampleInstance.dcl.loadIntoLocation( file[ 'default' ] , exampleInstance._element , 'example' )
                           .then( ( ref : ComponentRef ) => {
                               if ( exampleInstance._reference ) {
                                   exampleInstance._reference.dispose();
                               }
                               exampleInstance._loaded    = true;
                               exampleInstance._reference = ref;
                           } );
            exampleInstance.cd.detectChanges();
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
        if ( this.showSource ) {
            this.showTabs = false;
            TimerWrapper.setTimeout( () => {
                this.showSource = false;
            } , 500 );
        } else {
            this.showSource = true;
            TimerWrapper.setTimeout( () => {
                this.showTabs = true;
            } , 25 );
        }
    }
}
