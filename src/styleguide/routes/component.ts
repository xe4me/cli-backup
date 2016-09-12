import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { ComponentsService , IComponentMeta } from '../services/components';
import { NavigationService } from '../services/navigation';
import { ExampleComponent } from '../example';
@Component( {
    selector   : 'component-page' ,
    template   : `
    <div class="p palm-p0">
        <h1 class='examples-title'>Examples</h1>
        <p class='examples-intro example-readme' *ngIf='value.readme' [innerHtml]='value.readme'></p>
        <example *ngFor='let example of value.examples' [model]='example'></example>
    </div>
` ,
    directives : [ ExampleComponent ]
} )
export class ComponentPage implements OnInit {
    public id : string;
    public value : IComponentMeta    = <IComponentMeta>{};
    public next : IComponentMeta     = null;
    public previous : IComponentMeta = null;

    constructor ( private _components : ComponentsService ,
                  private _navigation : NavigationService ,
                  private route: ActivatedRoute ) {
    }

    ngOnInit () {

        this.route.params.subscribe((param) => {
            let id = param['id'];

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
        });
    }
}
