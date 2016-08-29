import { Component } from '@angular/core';


@Component( {
    selector    : 'grid' ,
    templateUrl : 'src/styleguide/layout/grid/grid.html' ,
    styles      : [ require( './grid.scss' ).toString() ] ,
    directives  : []
} )

export default class grid {
    // Note: This callback method needs to use the fat arrow (=>) to bind it to 'this'
    private callbackForChangeLink = (target : string) => {
    }
}
