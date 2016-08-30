import { LeftNavigationComponent } from './styleguide-components';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { ViewEncapsulation , Component } from '@angular/core';
import {
    FormModelService ,
    ScrollService ,
    ProgressObserverService ,
    AmpHttpService ,
} from 'amp-ddc-ui-core/ui-core';
import {
    ROUTER_DIRECTIVES ,
    RouteConfig ,
    Router
} from '@angular/router-deprecated';
import { IndexPage } from './routes/index';
import { ComponentPage } from './routes/component';
import { ComponentsService , IComponentMeta , IComponentGroupMeta } from './services/components';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { NavigationService } from './services/navigation';
import { TableContentsService } from './services/content-table-service';
import { ThemeService } from './services/theme';
@RouteConfig( [
    { path : '/' , name : 'Index' , component : IndexPage , useAsDefault : true } ,
    { path : '/components/:id' , name : 'Component' , component : ComponentPage }
] )
@Component( {
    selector      : 'styleguide-app' ,
    styles        : [ require( './app.scss' ).toString() ] ,
    providers     : [
        FormModelService ,
        TableContentsService ,
        ScrollService ,
        ProgressObserverService ,
        AmpHttpService ,
        NavigationService ,
        ComponentsService ,
        BrowserDomAdapter ,
        ThemeService ,
        MdIconRegistry
    ] ,
    template      : `
        <div class="styleguide-app">
            <div class="grid__item 1/6 styleguide-app--menu palm-hide">
                <left-navigation 
                    [contentTable]="contentTable"
                    [components]="components" 
                    [componentsGrouped]="componentsGrouped">    
                </left-navigation>
            </div><!--
         --><div class="examples grid__item 5/6 pl styleguide-app--components palm-p palm-1/1">
                <router-outlet ></router-outlet>
            </div>     
        </div>
    ` ,
    directives    : [ LeftNavigationComponent , ROUTER_DIRECTIVES ] ,
    encapsulation : ViewEncapsulation.None
} )
export class StyleGuideApp {
    public site : string                             = 'AMP DDC';
           version : string;
           components : IComponentMeta[]             = [];
    public componentsGrouped : IComponentGroupMeta[] = [];
    private contentTable;

    constructor ( public navigation : NavigationService ,
                  public router : Router ,
                  public tableContentsService : TableContentsService ,
                  private _componentsService : ComponentsService ) {
        this._componentsService.getComponents()
            .then( ( comps ) => {
                this.components = comps;
            } );
        this._componentsService.gertComponentsGrouped()
            .then( ( componentsGrouped ) => {
                this.componentsGrouped = componentsGrouped;
            } );
        this.tableContentsService.getContentsList()
            .then( ( contentTable ) => {
                this.contentTable = contentTable;
            } );
    }
}
