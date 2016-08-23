import { Component , OnInit } from '@angular/core';
import {
    Router
} from '@angular/router-deprecated';
@Component( {
    selector : 'default-router' ,
    template : ``
} )
export class AmpDefaultRouterComponent implements OnInit {
    /* TODO ;
     We're redirecting every request to BuyBackFormComponent currently , but this should be decided
     whether we want it to consume different applications or not ?
     * */
    ngOnInit () : any {
        // Initially we're redirecting the request to the / (which is generally the details page)
        this.router.navigate( [ 'BuyBackFormComponent' , { id : '' } ] );
        return undefined;
    }

    constructor ( private router : Router ) {
    }
}