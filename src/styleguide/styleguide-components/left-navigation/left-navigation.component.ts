import { Component , enableProdMode , bind , Input , OnDestroy , ApplicationRef } from '@angular/core';
import * as ngCore from '@angular/core';
import {
    ROUTER_PROVIDERS ,
    ROUTER_DIRECTIVES ,
    RouteConfig ,
    Router
} from '@angular/router-deprecated';
import { Http , Response , HTTP_PROVIDERS } from '@angular/http';
import { Media } from 'ng2-material/core/util/media';
import { ScrollService , FormModelService , AmpHttpService , ProgressObserverService } from 'amp-ddc-ui-core/ui-core';
import { Renderer } from '@angular/core';
@Component( {
    selector : 'left-navigation' ,
    template : `
    <div class='options'>
        <div
            *ngFor="let cmp of components"
            class='option' 
            [class.option--active]='false'
            (click)="navigate(['Component', {id: cmp.id}])">
                {{ cmp.name }}
        </div>
    </div>
` ,
    inputs   : [ 'components' ] ,
    styles   : [ require( './left-navigation.component.scss' ).toString() ]
} )
export class LeftNavigationComponent {
    constructor ( public router : Router ) {
    }

    navigate ( to : any ) {
        this.router.navigate( to );
    }
}