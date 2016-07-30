import { AmpAutoCompleteComponent } from '../app/components/amp-autocomplete/amp-autocomplete.component';
import { LeftNavigationComponent } from './styleguide-components';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import {
    ViewEncapsulation ,
    Component
} from '@angular/core';
import {
    FormModelService ,
    ScrollService ,
    ProgressObserverService ,
    AmpHttpService ,
    DynamicComponentLoaderFix
} from 'amp-ddc-ui-core/ui-core';
import {
    ROUTER_DIRECTIVES ,
    RouteConfig ,
    Router
} from '@angular/router-deprecated';
import { IndexPage } from './routes/index';
import { ComponentPage } from './routes/component';
import { ComponentsService , IComponentMeta } from './services/components';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { NavigationService } from './services/navigation';
export interface IExampleData {
    template : string;
    source : string;
    styles : string;
    component : string;
    component_src_location : string;
    name : string;
    galen? : string;
    jasmine? : string;
}
@RouteConfig( [
    { path : '/' , name : 'Index' , component : IndexPage , useAsDefault : true } ,
    { path : '/components/:id' , name : 'Component' , component : ComponentPage }
] )
@Component( {
    selector      : 'styleguide-app' ,
    styles        : [ require( './app.scss' ).toString() ] ,
    providers     : [
        FormModelService ,
        ScrollService ,
        ProgressObserverService ,
        AmpHttpService ,
        NavigationService ,
        ComponentsService ,
        BrowserDomAdapter ,
        DynamicComponentLoaderFix ,
        MdIconRegistry
    ] ,
    template      : `
        <div class="styleguide-app">
            <div class="grid__item 1/6 styleguide-app--menu">
                <left-navigation [components]="components"></left-navigation>
            </div><!--
         --><div class="examples grid__item 5/6 pl styleguide-app--components">
                <router-outlet ></router-outlet>
            </div>     
        </div>
    ` ,
    directives    : [ AmpAutoCompleteComponent , LeftNavigationComponent , ROUTER_DIRECTIVES ] ,
    encapsulation : ViewEncapsulation.None
} )
export class StyleGuideApp {
    public site : string                 = 'AMP DDC';
           version : string;
           components : IComponentMeta[] = [];

    constructor ( public navigation : NavigationService ,
                  public router : Router ,
                  private _components : ComponentsService ) {
        this._components.getComponents()
            .then( ( comps ) => {
                console.log( 'comps' , comps );
                this.components = comps;
            } );
    }
}
