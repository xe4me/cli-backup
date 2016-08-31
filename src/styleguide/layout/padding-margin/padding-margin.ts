import { Component } from '@angular/core';
import{ Highlight } from '../../highlight'

@Component( {
    selector    : 'padding-margin' ,
    templateUrl : 'src/styleguide/layout/padding-margin/padding-margin.html' ,
    styles      : [ require( './padding-margin.scss' ).toString() ] ,
    directives  : []
} )

export default class grid {
    // Note: This callback method needs to use the fat arrow (=>) to bind it to 'this'
    private callbackForChangeLink = (target : string) => {
    }
}
