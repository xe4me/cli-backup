import { FormPage } from './../formPage';
import { Component , ViewEncapsulation , OnInit , AfterViewInit , NgZone } from 'angular2/core';
import { RouteParams , Router , RouteRegistry , CanDeactivate , ComponentInstruction } from 'angular2/router';
@Component( {
    selector : 'details-page' ,
    template : `
    <div class="Landing">
    
        <div #nestedBlock></div>
      <!--<button (click)="next()">OK</button>-->

    </div>
  ` ,
    styles   : [ require( './details-page.scss' ).toString() ] ,
    // directives : [ AmpLeaveBlocker ]
    // encapsulation: ViewEncapsulation.Emulated
} )
export class DetailsPage extends FormPage implements CanDeactivate {
    static CLASS_NAME = 'DetailsPage';

    constructor ( public _router : Router ) {
        super();
    }

    routerCanDeactivate ( next : ComponentInstruction , prev : ComponentInstruction ) : any {
        return false;
    }
}
