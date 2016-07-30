import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
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