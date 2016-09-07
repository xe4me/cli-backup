import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
import { ComponentsService , IComponentMeta } from '../services/components';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { NavigationService } from '../services/navigation';
import { ExampleComponent } from '../example';
@Component( {
    selector   : 'component-page' ,
    styles     : [
        `
        :host{
            display: block;
            padding: 40px 90px;
        }
    `
    ] ,
    template   : `
    <h1 class='examples-title'>Examples</h1>
    <p class='examples-intro example-readme' *ngIf='value.readme' [innerHtml]='value.readme'></p>
    <example *ngFor='let example of value.examples' [model]='example'></example>
` ,
    directives : [ ExampleComponent , ROUTER_DIRECTIVES ]
} )
export class ComponentPage implements OnInit {
    public id : string;
    public value : IComponentMeta    = <IComponentMeta>{};
    public next : IComponentMeta     = null;
    public previous : IComponentMeta = null;

    constructor ( private _components : ComponentsService ,
                  private _navigation : NavigationService ,
                  private _routeParams : RouteParams ) {
    }

    ngOnInit () {
        let id = this._routeParams.get( 'id' );
        this._components.getComponent( id ).then( ( c : IComponentMeta ) => {
            this.value                    = c;
            //DOM.setTitle( 'AMP - DDC – ' + c.name );
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