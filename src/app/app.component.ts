import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    styles: [ require( '../styles/all.scss' )],
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None

})
export class AppComponent {
    private title = 'Welcome to your new AMP DDC Experience!';
}
