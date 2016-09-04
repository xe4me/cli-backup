import { LeftNavigationComponent } from './styleguide-components';
import { ViewEncapsulation , Component } from '@angular/core';

import { ComponentsService, IComponentMeta, IComponentGroupMeta } from './services/components';
import { TableContentsService } from './services/content-table-service';

@Component( {
    selector      : 'styleguide-app' ,
    styles        : [ require( './app.scss' ).toString() ] ,
    template      : `
        <div class="styleguide-app">
            <div class="grid__item 1/6 styleguide-app--menu">
                <left-navigation 
                    [contentTable]="contentTable"
                    [components]="components" 
                    [componentsGrouped]="componentsGrouped">    
                </left-navigation>
            </div><!--
         --><div class="examples grid__item 5/6 pl styleguide-app--components">
                <router-outlet ></router-outlet>
            </div>     
        </div>
    `,
    encapsulation : ViewEncapsulation.None
} )
export class StyleGuideApp {
    public site : string                             = 'AMP DDC';
           version : string;
           components : IComponentMeta[]             = [];
    public componentsGrouped : IComponentGroupMeta[] = [];
    private contentTable;

    constructor ( public tableContentsService : TableContentsService ,
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
