import { Component } from '@angular/core';
import { RouteConfig , RouterOutlet } from '@angular/router-deprecated';
import { RouteParams } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
import { ComponentsService , IComponentMeta } from '../services/components';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import Example from '../example';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { NavigationService } from '../services/navigation';
import { DOM } from '@angular/platform-browser';
import { SidenavService } from 'ng2-material/components/sidenav/sidenav_service';
import { TimerWrapper } from '@angular/core';
@Component( {
    selector   : 'component-page' ,
    template   : `
    <h1 class='examples-title'>Examples</h1>
    <p class='examples-intro' *ngIf='value.readme' [innerHtml]='value.readme'></p>

    <example *ngFor='#demo of value.examples' [model]='demo'></example>` ,
    directives : [ Example , ROUTER_DIRECTIVES , MATERIAL_DIRECTIVES ]
} )
export class ComponentPage implements OnInit {
    public id : string;
    public value : IComponentMeta = <IComponentMeta>{};
    public next : IComponentMeta     = null;
    public previous : IComponentMeta = null;

    constructor ( private _components : ComponentsService ,
                  private _navigation : NavigationService ,
                  private _sidenav : SidenavService ,
                  private _routeParams : RouteParams ) {
    }

    ngOnInit () {
        TimerWrapper.setTimeout( () => {
            this._sidenav.hide( 'menu' );
        } , 0 );
        let id = this._routeParams.get( 'id' );
        this._components.getComponent( id ).then( ( c : IComponentMeta ) => {
            this.value = c;
            DOM.setTitle( 'AMP - DDC – ' + c.name );
            this._navigation.currentTitle = c.name;
            this._components.getNext( c ).then( ( next : IComponentMeta ) => {
                this._navigation.nextLink = this._navigation.componentLink( next );
            } );
            this._components.getPrevious( c ).then( ( previous : IComponentMeta ) => {
                this._navigation.prevLink = this._navigation.componentLink( previous );
            } );
        } );
    }
}
