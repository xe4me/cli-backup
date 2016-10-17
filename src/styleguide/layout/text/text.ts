import { Component } from '@angular/core';

@Component( {
    selector    : 'text' ,
    templateUrl : 'src/styleguide/layout/text/text.html' ,
    styles      : [ require( './text.scss' ).toString() ] ,
    directives  : []
} )

export default class Text {
}
