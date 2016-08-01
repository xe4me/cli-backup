import { Component } from '@angular/core';
@Component( {
    selector : 'left-navigation' ,
    template : `
    <div class='options'>
        <div
            *ngFor="let cmp of meta"
            class='option' 
            [class.option--active]='false'
            (click)='setSelectValue(option.id)'>
            {{ cmp.name }}
        </div>
    </div>
` ,
    inputs   : [ 'meta' ] ,
    styles   : [ require( './left-navigation.component.scss' ).toString() ]
} )
export class LeftNavigationComponent {
}
