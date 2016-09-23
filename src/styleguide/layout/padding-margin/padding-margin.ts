import { Component } from '@angular/core';

@Component( {
    selector    : 'padding-margin' ,
    templateUrl : 'src/styleguide/layout/padding-margin/padding-margin.html' ,
    styles      : [ require( './padding-margin.scss' ).toString() ] ,
    directives  : []
} )

export default class PaddingMargin {
}
