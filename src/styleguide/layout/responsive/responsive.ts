import { Component } from '@angular/core';

@Component( {
    selector    : 'grid' ,
    templateUrl : 'src/styleguide/layout/responsive/responsive.html' ,
    styles      : [ require( './responsive.scss' ).toString() ] ,
    directives  : []
} )

export default class Responsive {
    // Note: This callback method needs to use the fat arrow (=>) to bind it to 'this'
    private callbackForChangeLink = (target : string) => {
    }
}
