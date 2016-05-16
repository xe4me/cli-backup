import { Component , OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { ComponentsService , IComponentMeta } from '../services/components';
import { NavigationService } from '../services/navigation';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { Highlight } from '../highlight';
import { SidenavService } from 'ng2-material/components/sidenav/sidenav_service';
import { TimerWrapper } from 'angular2/src/facade/async';
import { Http , Response } from 'angular2/http';
@Component( {
    templateUrl : 'src/styleguide/routes/index.html' ,
    directives  : [ ROUTER_DIRECTIVES , Highlight , MATERIAL_DIRECTIVES ]
} )
export class IndexPage implements OnInit {
    public components : IComponentMeta[] = [];
    public angularVersion : string       = '';

    constructor ( private _components : ComponentsService ,
                  private _sidenav : SidenavService ,
                  public http : Http ,
                  public navigation : NavigationService ) {
    }

    ngOnInit () : any {
        this.http.get( 'src/assets/version.json' )
            .subscribe( ( res : Response ) => {
                this.angularVersion = res.json().angular2;
            } );
        TimerWrapper.setTimeout( () => {
            this._sidenav.hide( 'menu' );
        } , 0 );
        this._components.getComponents()
            .then( ( comps ) => {
                this.components = comps;
                let title       = 'AMP Dynamic data capture styleguide';
                DOM.setTitle( title );
                this.navigation.currentTitle = title;
                this.navigation.prevLink     = this.navigation.componentLink( comps[ comps.length - 1 ] );
                this.navigation.nextLink     = this.navigation.componentLink( comps[ 0 ] );
            } );
    }
}
