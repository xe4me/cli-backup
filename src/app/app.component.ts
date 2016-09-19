import { Component , ViewEncapsulation } from '@angular/core';
@Component( {
    selector : 'app-root' ,
    styles        : [ require( './app.component.scss' ) ] ,
    templateUrl   : './app.component.html' ,
    encapsulation : ViewEncapsulation.None
} )
export class AppComponent {
    title = 'Welcome to your new AMP DDC Experience!';
}
