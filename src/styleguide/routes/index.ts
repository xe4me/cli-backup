import { Component , OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ComponentsService , IComponentMeta } from '../services/components';
import { NavigationService } from '../services/navigation';
import { Http } from '@angular/http';
@Component( {
    templateUrl : 'src/styleguide/routes/index.html' ,
    directives  : [ ROUTER_DIRECTIVES ]
} )
export class IndexPage implements OnInit {
    public components : IComponentMeta[] = [];
    public angularVersion : string       = '';

    constructor ( private _components : ComponentsService ,
                  public http : Http ,
                  public navigation : NavigationService ) {
    }

    ngOnInit () : any {
        // this.http.get( 'src/assets/version.json' )
        //     .subscribe( ( res : Response ) => {
        //         this.angularVersion = res.json().angular2;
        //     } );
        this._components.getComponents()
            .then( ( comps ) => {
                this.components              = comps;
                let title                    = 'AMP Dynamic data capture styleguide';
                this.navigation.currentTitle = title;
                this.navigation.prevLink     = this.navigation.componentLink( comps[ comps.length - 1 ] );
                this.navigation.nextLink     = this.navigation.componentLink( comps[ 0 ] );
            } );
    }
}
