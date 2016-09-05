import { Component , OnInit } from '@angular/core';
import { ComponentsService , IComponentMeta } from '../services/components';
import { NavigationService } from '../services/navigation';
import { TableContentsService } from '../services/content-table-service';
import { Http } from '@angular/http';
import { Highlight } from '../highlight';
@Component( {
    templateUrl : 'src/styleguide/routes/index.html' ,
    directives  : [ Highlight ]
} )
export class IndexPage implements OnInit {
    public components : IComponentMeta[] = [];
    public angularVersion : string       = '';
    private contentTable;

    constructor ( private _components : ComponentsService ,
                  public http : Http ,
                  public tableContentsService : TableContentsService ,
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
        this.tableContentsService.getContentsList()
            .then( ( contentTable ) => {
                this.contentTable = contentTable;
            } );
    }
}
