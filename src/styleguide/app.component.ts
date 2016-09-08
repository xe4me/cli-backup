import { LeftNavigationComponent } from './styleguide-components';
import { ViewEncapsulation , Component } from '@angular/core';

import { ComponentsService, IComponentMeta, IComponentGroupMeta } from './services/components';
import { TableContentsService } from './services/content-table-service';

@Component( {
    selector      : 'styleguide-app' ,
    styles        : [ require( './app.scss' ).toString() ] ,
    template      : `
        <button (click)="hideNavigation=!hideNavigation">Slide</button>
        <div class="styleguide-app">
            <div class="grid__item 1/6 styleguide-app--menu palm-hide" [class.desk-hide]="hideNavigation">
                <left-navigation
                    [contentTable]="contentTable"
                    [components]="components"
                    [componentsGrouped]="componentsGrouped">
                </left-navigation>
            </div><!--
         --><div class="examples grid__item 5/6 pl styleguide-app--components palm-p palm-1/1" [ngClass]="{'desk-1/1':hideNavigation}">
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
    private hideNavigation                           = true;

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
